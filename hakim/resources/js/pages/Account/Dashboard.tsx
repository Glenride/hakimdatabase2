import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { index as ordersIndex, show as ordersShow } from '@/routes/orders';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Package, Clock, Truck, CheckCircle } from 'lucide-react';

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

interface OrderStats {
    total: number;
    pending: number;
    processing: number;
    shipped: number;
}

interface Props {
    recentOrders: Order[];
    orderStats: OrderStats;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
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
        month: 'short',
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

export default function Dashboard({ recentOrders, orderStats }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="My Account" />
            
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Welcome Section */}
                <div>
                    <h1 className="text-2xl font-serif font-bold text-gray-900">Welcome back</h1>
                    <p className="text-gray-600 mt-1">Track your orders and manage your account.</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-white border border-gray-200 rounded-xl p-5">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-gray-100 rounded-lg">
                                <Package className="w-5 h-5 text-gray-600" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-gray-900">{orderStats.total}</p>
                                <p className="text-sm text-gray-500">Total Orders</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-white border border-gray-200 rounded-xl p-5">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-yellow-100 rounded-lg">
                                <Clock className="w-5 h-5 text-yellow-600" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-gray-900">{orderStats.pending}</p>
                                <p className="text-sm text-gray-500">Pending</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-white border border-gray-200 rounded-xl p-5">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-100 rounded-lg">
                                <Package className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-gray-900">{orderStats.processing}</p>
                                <p className="text-sm text-gray-500">In Production</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-white border border-gray-200 rounded-xl p-5">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-green-100 rounded-lg">
                                <Truck className="w-5 h-5 text-green-600" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-gray-900">{orderStats.shipped}</p>
                                <p className="text-sm text-gray-500">Shipped/Delivered</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recent Orders */}
                <div className="bg-white border border-gray-200 rounded-xl">
                    <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                        <h2 className="font-semibold text-gray-900">Recent Orders</h2>
                        <Link 
                            href={ordersIndex().url}
                            className="text-sm text-gray-600 hover:text-gray-900 transition"
                        >
                            View all →
                        </Link>
                    </div>
                    
                    {recentOrders.length === 0 ? (
                        <div className="px-6 py-12 text-center">
                            <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                            <h3 className="text-gray-900 font-medium mb-1">No orders yet</h3>
                            <p className="text-gray-500 text-sm mb-4">
                                When you place an order, it will appear here.
                            </p>
                            <Link 
                                href="/"
                                className="inline-block bg-black text-white px-6 py-2 text-sm font-medium hover:bg-gray-800 transition rounded"
                            >
                                Start Shopping
                            </Link>
                        </div>
                    ) : (
                        <div className="divide-y divide-gray-100">
                            {recentOrders.map((order) => (
                                <Link 
                                    key={order.id}
                                    href={ordersShow(order.id).url}
                                    className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50 transition"
                                >
                                    {/* Product Image */}
                                    <div className="w-16 h-20 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                                        {order.product?.images?.[0] ? (
                                            <img 
                                                src={`/storage/${order.product.images[0].path}`} 
                                                alt={order.product.title}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                                                <Package className="w-6 h-6" />
                                            </div>
                                        )}
                                    </div>
                                    
                                    {/* Order Details */}
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium text-gray-900 truncate">
                                            {order.product?.title || 'Product'}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            Order {order.order_number}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            {formatDate(order.created_at)}
                                            {order.size && ` • Size ${order.size}`}
                                        </p>
                                    </div>
                                    
                                    {/* Status & Price */}
                                    <div className="text-right">
                                        <p className="font-medium text-gray-900">
                                            {formatPrice(order.amount_cents, order.currency)}
                                        </p>
                                        <span className={`inline-block mt-1 px-2 py-0.5 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
                                            {getStatusLabel(order.status)}
                                        </span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
