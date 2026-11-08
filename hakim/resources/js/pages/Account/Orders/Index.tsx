import AppLayout from '@/layouts/app-layout';
import { index as ordersIndex, show as ordersShow } from '@/routes/orders';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Package, ChevronLeft, ChevronRight } from 'lucide-react';

interface ProductImage {
    id: number;
    path: string;
}

interface Product {
    id: number;
    title: string;
    slug: string;
    images: ProductImage[];
}

interface Order {
    id: number;
    order_number: string;
    status: string;
    amount_cents: number;
    currency: string;
    size: string | null;
    created_at: string;
    product: Product;
}

interface PaginatedOrders {
    data: Order[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    next_page_url: string | null;
    prev_page_url: string | null;
}

interface Props {
    orders: PaginatedOrders;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'My Orders',
        href: ordersIndex().url,
    },
];

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

const getStatusColor = (status: string) => {
    switch (status) {
        case 'pending':
            return 'bg-yellow-100 text-yellow-800';
        case 'confirmed':
        case 'processing':
            return 'bg-blue-100 text-blue-800';
        case 'shipped':
            return 'bg-purple-100 text-purple-800';
        case 'delivered':
            return 'bg-green-100 text-green-800';
        case 'cancelled':
            return 'bg-red-100 text-red-800';
        default:
            return 'bg-gray-100 text-gray-800';
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

export default function OrdersIndex({ orders }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="My Orders" />
            
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Header */}
                <div>
                    <h1 className="text-2xl font-serif font-bold text-gray-900">My Orders</h1>
                    <p className="text-gray-600 mt-1">
                        {orders.total === 0 
                            ? 'You haven\'t placed any orders yet.' 
                            : `You have ${orders.total} order${orders.total === 1 ? '' : 's'}.`
                        }
                    </p>
                </div>

                {/* Orders List */}
                {orders.data.length === 0 ? (
                    <div className="bg-white border border-gray-200 rounded-xl px-6 py-16 text-center">
                        <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No orders yet</h3>
                        <p className="text-gray-500 mb-6 max-w-sm mx-auto">
                            When you purchase a gown, your order will appear here so you can track its progress.
                        </p>
                        <Link 
                            href="/"
                            className="inline-block bg-black text-white px-8 py-3 text-sm font-bold uppercase tracking-widest hover:bg-gray-800 transition"
                        >
                            Browse Collection
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {orders.data.map((order) => (
                            <Link 
                                key={order.id}
                                href={ordersShow(order.id).url}
                                className="block bg-white border border-gray-200 rounded-xl hover:border-gray-300 hover:shadow-sm transition"
                            >
                                <div className="p-6">
                                    <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                                        {/* Product Image */}
                                        <div className="w-24 h-30 sm:w-20 sm:h-24 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                                            {order.product?.images?.[0] ? (
                                                <img 
                                                    src={`/storage/${order.product.images[0].path}`} 
                                                    alt={order.product.title}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-gray-400">
                                                    <Package className="w-8 h-8" />
                                                </div>
                                            )}
                                        </div>
                                        
                                        {/* Order Details */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                                                <div>
                                                    <h3 className="font-medium text-gray-900 text-lg">
                                                        {order.product?.title || 'Product'}
                                                    </h3>
                                                    <p className="text-sm text-gray-500 mt-1">
                                                        Order {order.order_number}
                                                    </p>
                                                </div>
                                                <span className={`self-start inline-block px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                                                    {getStatusLabel(order.status)}
                                                </span>
                                            </div>
                                            
                                            <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-sm text-gray-600">
                                                <span>Ordered {formatDate(order.created_at)}</span>
                                                {order.size && <span>Size {order.size}</span>}
                                                <span className="font-medium text-gray-900">
                                                    {formatPrice(order.amount_cents, order.currency)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                        
                        {/* Pagination */}
                        {orders.last_page > 1 && (
                            <div className="flex items-center justify-between pt-4">
                                <p className="text-sm text-gray-600">
                                    Page {orders.current_page} of {orders.last_page}
                                </p>
                                <div className="flex gap-2">
                                    {orders.prev_page_url && (
                                        <Link 
                                            href={orders.prev_page_url}
                                            className="flex items-center gap-1 px-4 py-2 text-sm border border-gray-200 rounded hover:bg-gray-50 transition"
                                        >
                                            <ChevronLeft className="w-4 h-4" />
                                            Previous
                                        </Link>
                                    )}
                                    {orders.next_page_url && (
                                        <Link 
                                            href={orders.next_page_url}
                                            className="flex items-center gap-1 px-4 py-2 text-sm border border-gray-200 rounded hover:bg-gray-50 transition"
                                        >
                                            Next
                                            <ChevronRight className="w-4 h-4" />
                                        </Link>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
