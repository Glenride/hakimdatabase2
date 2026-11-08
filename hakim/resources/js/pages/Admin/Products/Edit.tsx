import AppLayout from '@/layouts/app-layout';
import { Head, useForm, router, Link } from '@inertiajs/react';
import { PageProps } from '@/types';
import { useState } from 'react';

export default function Edit({ product, categories, collections, shippingProfiles }: PageProps<{ product: any, categories: any[], collections: any[], shippingProfiles: any[] }>) {
    const { data, setData, post, processing, errors } = useForm({
        _method: 'PUT',
        title: product.title,
        description: product.description || '',
        price_cents: product.price_cents,
        inventory: product.inventory,
        category_id: product.category_id || '',
        collection_id: product.collection_id || '',
        shipping_profile_id: product.shipping_profile_id || '',
        allow_customization: product.allow_customization,
        status: product.status,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.products.update', product.id));
    };

    const publish = () => {
        if (confirm('Are you sure you want to publish this product? This will sync with Stripe.')) {
            router.post(route('admin.products.publish', product.id));
        }
    };

    return (
        <AppLayout breadcrumbs={[{ title: 'Products', href: '/admin/products' }, { title: product.title, href: '#' }]}>
            <Head title={`Edit ${product.title}`} />

            <div className="max-w-5xl mx-auto p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Edit Product</h1>
                    <div className="flex gap-2">
                         {product.status !== 'published' && (
                             <button 
                                onClick={publish}
                                className="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-bold hover:bg-green-700 transition"
                             >
                                Publish
                             </button>
                         )}
                         <Link href={`/products/${product.slug}`} target="_blank" className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm font-bold hover:bg-gray-50 transition">
                            Preview
                         </Link>
                    </div>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Form */}
                    <div className="lg:col-span-2 space-y-6">
                        <form onSubmit={submit} className="bg-white p-6 rounded-lg shadow border border-gray-100 space-y-6">
                            <div className="grid grid-cols-2 gap-6">
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium mb-1">Title</label>
                                    <input 
                                        type="text" 
                                        className="w-full border-gray-300 rounded-md shadow-sm focus:border-black focus:ring-black" 
                                        value={data.title}
                                        onChange={e => setData('title', e.target.value)}
                                    />
                                    {errors.title && <div className="text-red-500 text-xs mt-1">{errors.title}</div>}
                                </div>

                                <div className="col-span-2">
                                    <label className="block text-sm font-medium mb-1">Description</label>
                                    <textarea 
                                        className="w-full border-gray-300 rounded-md shadow-sm focus:border-black focus:ring-black" 
                                        rows={4}
                                        value={data.description}
                                        onChange={e => setData('description', e.target.value)}
                                    />
                                    {errors.description && <div className="text-red-500 text-xs mt-1">{errors.description}</div>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1">Price (Cents)</label>
                                    <input 
                                        type="number" 
                                        className="w-full border-gray-300 rounded-md shadow-sm focus:border-black focus:ring-black" 
                                        value={data.price_cents}
                                        onChange={e => setData('price_cents', e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Inventory</label>
                                    <input 
                                        type="number" 
                                        className="w-full border-gray-300 rounded-md shadow-sm focus:border-black focus:ring-black" 
                                        value={data.inventory}
                                        onChange={e => setData('inventory', parseInt(e.target.value))}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1">Category</label>
                                    <select 
                                        className="w-full border-gray-300 rounded-md shadow-sm focus:border-black focus:ring-black"
                                        value={data.category_id}
                                        onChange={e => setData('category_id', e.target.value)}
                                    >
                                        <option value="">Select Category...</option>
                                        {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Collection</label>
                                    <select 
                                        className="w-full border-gray-300 rounded-md shadow-sm focus:border-black focus:ring-black"
                                        value={data.collection_id}
                                        onChange={e => setData('collection_id', e.target.value)}
                                    >
                                        <option value="">Select Collection...</option>
                                        {collections.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                    </select>
                                </div>

                                <div className="col-span-2">
                                    <label className="block text-sm font-medium mb-1">Shipping Profile</label>
                                    <select 
                                        className="w-full border-gray-300 rounded-md shadow-sm focus:border-black focus:ring-black"
                                        value={data.shipping_profile_id}
                                        onChange={e => setData('shipping_profile_id', e.target.value)}
                                    >
                                         {shippingProfiles.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                                    </select>
                                </div>

                                <div className="col-span-2 flex items-center gap-2">
                                     <input 
                                        type="checkbox" 
                                        id="allow_customization"
                                        checked={data.allow_customization}
                                        onChange={e => setData('allow_customization', e.target.checked)}
                                        className="rounded border-gray-300 text-black focus:ring-black"
                                    />
                                    <label htmlFor="allow_customization" className="text-sm font-medium">Allow Customization</label>
                                </div>
                                
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium mb-1">Status</label>
                                    <select 
                                        className="w-full border-gray-300 rounded-md shadow-sm focus:border-black focus:ring-black"
                                        value={data.status}
                                        onChange={e => setData('status', e.target.value)}
                                    >
                                        <option value="draft">Draft</option>
                                        <option value="review">Review</option>
                                        <option value="published">Published</option>
                                        <option value="sold">Sold</option>
                                    </select>
                                </div>
                            </div>

                            <div className="flex justify-end pt-6 border-t border-gray-100">
                                <button 
                                    type="submit" 
                                    disabled={processing}
                                    className="bg-black text-white px-6 py-2 rounded-md text-sm font-bold hover:bg-gray-800 disabled:opacity-50 transition"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Sidebar / Images & Sizes (Placeholder for now to keep it lean) */}
                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
                            <h3 className="font-bold mb-4">Images</h3>
                            <div className="grid grid-cols-2 gap-2 mb-4">
                                {product.images.map((img: any) => (
                                    <div key={img.id} className="aspect-[4/5] bg-gray-100 relative group">
                                        <img src={`/storage/${img.path}`} className="w-full h-full object-cover" />
                                        <button className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded opacity-0 group-hover:opacity-100 text-xs">
                                            X
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <div className="text-xs text-gray-500 text-center border-2 border-dashed border-gray-200 rounded p-4 cursor-pointer hover:border-gray-400">
                                Click to upload images
                            </div>
                        </div>

                         <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
                            <h3 className="font-bold mb-4">Sizes</h3>
                            <div className="space-y-2">
                                {product.sizes.map((size: any) => (
                                    <div key={size.id} className="flex justify-between items-center text-sm border p-2 rounded">
                                        <span>{size.label}</span>
                                        <span className={size.available ? 'text-green-600' : 'text-red-600'}>
                                            {size.available ? 'Available' : 'Unavailable'}
                                        </span>
                                    </div>
                                ))}
                                {product.sizes.length === 0 && <p className="text-sm text-gray-500">No sizes added.</p>}
                            </div>
                            <button className="mt-4 w-full border border-gray-300 py-2 text-sm rounded hover:bg-gray-50">
                                Manage Sizes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
