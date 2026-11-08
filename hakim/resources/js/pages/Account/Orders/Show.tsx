import AppLayout from '@/layouts/app-layout';
import { index as ordersIndex, show as ordersShow } from '@/routes/orders';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Package, ArrowLeft, Check, Clock, Truck, Home, XCircle } from 'lucide-react';

interface ProductImage {
    id: number;
    path: string;
}

interface Product {
    id: number;
    title: string;
    slug: string;
    description: string | null;
    images: ProductImage[];
}

interface Order {
    id: number;
    order_number: string;
    status: string;
    amount_cents: number;
    currency: string;
    size: string | null;
    customization_notes: string | null;
    shipping_amount_cents: number;
    shipping_country_code: string | null;
    shipping_address: Record<string, string> | null;
    stripe_session_id: string | null;
    created_at: string;
    paid_at: string | null;
    shipped_at: string | null;
    delivered_at: string | null;
    product: Product;
}

interface Props {
    order: Order;
}

const formatPrice = (cents: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency,
    }).format(cents / 100);
};

const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};

const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
    });
};

const getStatusColor = (status: string) => {
    switch (status) {
        case 'pending':
            return 'bg-yellow-100 text-yellow-800 border-yellow-200';
        case 'confirmed':
        case 'processing':
            return 'bg-blue-100 text-blue-800 border-blue-200';
        case 'shipped':
            return 'bg-purple-100 text-purple-800 border-purple-200';
        case 'delivered':
            return 'bg-green-100 text-green-800 border-green-200';
        case 'cancelled':
            return 'bg-red-100 text-red-800 border-red-200';
        default:
            return 'bg-gray-100 text-gray-800 border-gray-200';
    }
};

const getStatusLabel = (status: string) => {
    switch (status) {
        case 'pending':
            return 'Pending Payment';
        case 'confirmed':
            return 'Confirmed';
        case 'processing':
            return 'In Production';
        case 'shipped':
            return 'Shipped';
        case 'delivered':
            return 'Delivered';
        case 'cancelled':
            return 'Cancelled';
        default:
            return status.charAt(0).toUpperCase() + status.slice(1);
    }
};

const orderSteps = [
    { key: 'confirmed', label: 'Confirmed', icon: Check },
    { key: 'processing', label: 'In Production', icon: Package },
    { key: 'shipped', label: 'Shipped', icon: Truck },
    { key: 'delivered', label: 'Delivered', icon: Home },
];

const getStepStatus = (currentStatus: string, stepKey: string) => {
    const statusOrder = ['pending', 'confirmed', 'processing', 'shipped', 'delivered'];
    const currentIndex = statusOrder.indexOf(currentStatus);
    const stepIndex = statusOrder.indexOf(stepKey);
    
    if (currentStatus === 'cancelled') return 'cancelled';
    if (stepIndex < currentIndex) return 'completed';
    if (stepIndex === currentIndex) return 'current';
    return 'upcoming';
};

export default function OrderShow({ order }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'My Orders',
            href: ordersIndex().url,
        },
        {
            title: order.order_number,
            href: ordersShow(order.id).url,
        },
    ];

    const isCancelled = order.status === 'cancelled';
    const isPending = order.status === 'pending';

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Order ${order.order_number}`} />
            
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Back Link & Header */}
                <div>
                    <Link 
                        href={ordersIndex().url}
                        className="inline-flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 mb-4 transition"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to orders
                    </Link>
                    
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                            <h1 className="text-2xl font-serif font-bold text-gray-900">
                                Order {order.order_number}
                            </h1>
                            <p className="text-gray-600 mt-1">
                                Placed on {formatDateTime(order.created_at)}
                            </p>
                        </div>
                        <span className={`self-start inline-block px-4 py-2 text-sm font-semibold rounded-full border ${getStatusColor(order.status)}`}>
                            {getStatusLabel(order.status)}
                        </span>
                    </div>
                </div>

                {/* Order Progress (for non-cancelled, non-pending orders) */}
                {!isCancelled && !isPending && (
                    <div className="bg-white border border-gray-200 rounded-xl p-6">
                        <h2 className="font-semibold text-gray-900 mb-6">Order Progress</h2>
                        <div className="relative">
                            {/* Progress Line */}
                            <div className="absolute top-5 left-5 right-5 h-0.5 bg-gray-200">
                                <div 
                                    className="h-full bg-black transition-all"
                                    style={{
                                        width: `${Math.max(0, (orderSteps.findIndex(s => s.key === order.status) / (orderSteps.length - 1)) * 100)}%`
                                    }}
                                />
                            </div>
                            
                            {/* Steps */}
                            <div className="relative flex justify-between">
                                {orderSteps.map((step) => {
                                    const status = getStepStatus(order.status, step.key);
                                    const Icon = step.icon;
                                    
                                    return (
                                        <div key={step.key} className="flex flex-col items-center">
                                            <div className={`
                                                w-10 h-10 rounded-full flex items-center justify-center z-10 transition
                                                ${status === 'completed' ? 'bg-black text-white' : ''}
                                                ${status === 'current' ? 'bg-black text-white ring-4 ring-gray-200' : ''}
                                                ${status === 'upcoming' ? 'bg-white border-2 border-gray-200 text-gray-400' : ''}
                                            `}>
                                                <Icon className="w-5 h-5" />
                                            </div>
                                            <span className={`
                                                mt-2 text-xs font-medium text-center
                                                ${status === 'upcoming' ? 'text-gray-400' : 'text-gray-900'}
                                            `}>
                                                {step.label}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                )}

                {/* Cancelled Notice */}
                {isCancelled && (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                        <div className="flex items-start gap-3">
                            <XCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
                            <div>
                                <h3 className="font-medium text-red-900">Order Cancelled</h3>
                                <p className="text-red-700 text-sm mt-1">
                                    This order has been cancelled. If you have any questions, please contact us.
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Pending Payment Notice */}
                {isPending && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                        <div className="flex items-start gap-3">
                            <Clock className="w-6 h-6 text-yellow-600 flex-shrink-0" />
                            <div>
                                <h3 className="font-medium text-yellow-900">Payment Pending</h3>
                                <p className="text-yellow-700 text-sm mt-1">
                                    We're waiting for your payment to be confirmed. Once confirmed, we'll begin working on your gown.
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Product Details */}
                    <div className="lg:col-span-2 bg-white border border-gray-200 rounded-xl overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-100">
                            <h2 className="font-semibold text-gray-900">Order Details</h2>
                        </div>
                        
                        <div className="p-6">
                            <div className="flex gap-6">
                                {/* Product Image */}
                                <div className="w-32 h-40 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                                    {order.product?.images?.[0] ? (
                                        <img 
                                            src={`/storage/${order.product.images[0].path}`} 
                                            alt={order.product.title}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                                            <Package className="w-10 h-10" />
                                        </div>
                                    )}
                                </div>
                                
                                {/* Product Info */}
                                <div className="flex-1">
                                    <Link 
                                        href={`/products/${order.product?.slug}`}
                                        className="font-serif text-xl font-medium text-gray-900 hover:text-gray-700 transition"
                                    >
                                        {order.product?.title || 'Product'}
                                    </Link>
                                    
                                    {order.size && (
                                        <p className="text-gray-600 mt-2">
                                            Size: <span className="font-medium">{order.size}</span>
                                        </p>
                                    )}
                                    
                                    {order.customization_notes && (
                                        <div className="mt-4">
                                            <p className="text-sm text-gray-500 mb-1">Customization Notes:</p>
                                            <p className="text-gray-700 bg-gray-50 rounded p-3 text-sm">
                                                {order.customization_notes}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-100">
                            <h2 className="font-semibold text-gray-900">Order Summary</h2>
                        </div>
                        
                        <div className="p-6 space-y-4">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Subtotal</span>
                                <span className="text-gray-900">
                                    {formatPrice(order.amount_cents - order.shipping_amount_cents, order.currency)}
                                </span>
                            </div>
                            
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Shipping</span>
                                <span className="text-gray-900">
                                    {order.shipping_amount_cents > 0 
                                        ? formatPrice(order.shipping_amount_cents, order.currency)
                                        : 'Free'
                                    }
                                </span>
                            </div>
                            
                            <div className="border-t border-gray-100 pt-4 flex justify-between">
                                <span className="font-semibold text-gray-900">Total</span>
                                <span className="font-semibold text-gray-900">
                                    {formatPrice(order.amount_cents, order.currency)}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Timeline */}
                <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-100">
                        <h2 className="font-semibold text-gray-900">Order Timeline</h2>
                    </div>
                    
                    <div className="p-6">
                        <div className="space-y-4">
                            {order.delivered_at && (
                                <div className="flex gap-4">
                                    <div className="w-2 h-2 mt-2 rounded-full bg-green-500" />
                                    <div>
                                        <p className="font-medium text-gray-900">Delivered</p>
                                        <p className="text-sm text-gray-500">{formatDateTime(order.delivered_at)}</p>
                                    </div>
                                </div>
                            )}
                            
                            {order.shipped_at && (
                                <div className="flex gap-4">
                                    <div className="w-2 h-2 mt-2 rounded-full bg-purple-500" />
                                    <div>
                                        <p className="font-medium text-gray-900">Shipped</p>
                                        <p className="text-sm text-gray-500">{formatDateTime(order.shipped_at)}</p>
                                    </div>
                                </div>
                            )}
                            
                            {order.paid_at && (
                                <div className="flex gap-4">
                                    <div className="w-2 h-2 mt-2 rounded-full bg-blue-500" />
                                    <div>
                                        <p className="font-medium text-gray-900">Payment Confirmed</p>
                                        <p className="text-sm text-gray-500">{formatDateTime(order.paid_at)}</p>
                                    </div>
                                </div>
                            )}
                            
                            <div className="flex gap-4">
                                <div className="w-2 h-2 mt-2 rounded-full bg-gray-400" />
                                <div>
                                    <p className="font-medium text-gray-900">Order Placed</p>
                                    <p className="text-sm text-gray-500">{formatDateTime(order.created_at)}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Help Section */}
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                    <h3 className="font-medium text-gray-900 mb-2">Need help with your order?</h3>
                    <p className="text-sm text-gray-600 mb-4">
                        If you have any questions about your order, please don't hesitate to reach out.
                    </p>
                    <Link 
                        href="/about"
                        className="inline-block text-sm font-medium text-gray-900 underline underline-offset-4 hover:text-gray-700 transition"
                    >
                        Contact Us
                    </Link>
                </div>
            </div>
        </AppLayout>
    );
}
