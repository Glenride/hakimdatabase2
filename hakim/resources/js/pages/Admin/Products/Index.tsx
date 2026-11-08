import AppLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';
import { PageProps } from '@/types';

interface Product {
    id: number;
    title: string;
    status: string;
    price_cents: number;
    inventory: number;
    currency: string;
    images: { path: string }[];
    category?: { name: string };
}

export default function Index({ products }: PageProps<{ products: { data: Product[] } }>) {
    const formatPrice = (cents: number, currency: string) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency,
        }).format(cents / 100);
    };

    return (
        <AppLayout breadcrumbs={[{ title: 'Products', href: '/admin/products' }]}>
            <Head title="Products" />

            <div className="flex h-full flex-col gap-4 p-4">
                <div className="flex justify-between items-center">
                    <h1 className="text-xl font-bold">Products</h1>
                    <Link 
                        href={route('admin.products.create')} 
                        className="bg-black text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-800"
                    >
                        New Product
                    </Link>
                </div>

                <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-100">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-50 text-gray-500 uppercase text-xs font-medium">
                            <tr>
                                <th className="px-6 py-3">Product</th>
                                <th className="px-6 py-3">Status</th>
                                <th className="px-6 py-3">Category</th>
                                <th className="px-6 py-3">Price</th>
                                <th className="px-6 py-3">Inventory</th>
                                <th className="px-6 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {products.data.map((product) => (
                                <tr key={product.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-4">
                                            <div className="h-12 w-12 bg-gray-100 rounded overflow-hidden shrink-0">
                                                {product.images[0] && (
                                                    <img src={`/storage/${product.images[0].path}`} className="w-full h-full object-cover" />
                                                )}
                                            </div>
                                            <span className="font-medium text-gray-900">{product.title}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-bold uppercase tracking-wide
                                            ${product.status === 'published' ? 'bg-green-100 text-green-800' : ''}
                                            ${product.status === 'draft' ? 'bg-gray-100 text-gray-800' : ''}
                                            ${product.status === 'sold' ? 'bg-red-100 text-red-800' : ''}
                                            ${product.status === 'review' ? 'bg-yellow-100 text-yellow-800' : ''}
                                        `}>
                                            {product.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-600">
                                        {product.category?.name || '-'}
                                    </td>
                                    <td className="px-6 py-4 font-medium">
                                        {formatPrice(product.price_cents, product.currency)}
                                    </td>
                                    <td className="px-6 py-4 text-gray-600">
                                        {product.inventory}
                                    </td>
                                    <td className="px-6 py-4">
                                        <Link href={route('admin.products.edit', product.id)} className="text-blue-600 hover:underline mr-4">Edit</Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {products.data.length === 0 && (
                         <div className="p-12 text-center text-gray-500">
                             No products found.
                         </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
