import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { PageProps } from '@/types';

export default function Create({ categories, collections, shippingProfiles }: PageProps<{ categories: any[], collections: any[], shippingProfiles: any[] }>) {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        description: '',
        price_cents: '',
        inventory: 1,
        category_id: '',
        collection_id: '',
        shipping_profile_id: shippingProfiles[0]?.id || '',
        allow_customization: false,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.products.store'));
    };

    return (
        <AppLayout breadcrumbs={[{ title: 'Products', href: '/admin/products' }, { title: 'New', href: '#' }]}>
            <Head title="New Product" />

            <div className="max-w-3xl mx-auto p-6">
                <h1 className="text-2xl font-bold mb-6">Create Product</h1>
                
                <form onSubmit={submit} className="bg-white p-6 rounded-lg shadow border border-gray-100 space-y-6">
                    <div>
                        <label className="block text-sm font-medium mb-1">Title</label>
                        <input 
                            type="text" 
                            className="w-full border-gray-300 rounded-md shadow-sm focus:border-black focus:ring-black" 
                            value={data.title}
                            onChange={e => setData('title', e.target.value)}
                        />
                        {errors.title && <div className="text-red-500 text-xs mt-1">{errors.title}</div>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Description</label>
                        <textarea 
                            className="w-full border-gray-300 rounded-md shadow-sm focus:border-black focus:ring-black" 
                            rows={4}
                            value={data.description}
                            onChange={e => setData('description', e.target.value)}
                        />
                        {errors.description && <div className="text-red-500 text-xs mt-1">{errors.description}</div>}
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium mb-1">Price (Cents)</label>
                            <input 
                                type="number" 
                                className="w-full border-gray-300 rounded-md shadow-sm focus:border-black focus:ring-black" 
                                value={data.price_cents}
                                onChange={e => setData('price_cents', e.target.value)}
                            />
                            {errors.price_cents && <div className="text-red-500 text-xs mt-1">{errors.price_cents}</div>}
                        </div>
                         <div>
                            <label className="block text-sm font-medium mb-1">Inventory</label>
                            <input 
                                type="number" 
                                className="w-full border-gray-300 rounded-md shadow-sm focus:border-black focus:ring-black" 
                                value={data.inventory}
                                onChange={e => setData('inventory', parseInt(e.target.value))}
                            />
                            {errors.inventory && <div className="text-red-500 text-xs mt-1">{errors.inventory}</div>}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
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
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Shipping Profile</label>
                        <select 
                            className="w-full border-gray-300 rounded-md shadow-sm focus:border-black focus:ring-black"
                            value={data.shipping_profile_id}
                            onChange={e => setData('shipping_profile_id', e.target.value)}
                        >
                             {shippingProfiles.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                        </select>
                    </div>

                    <div className="flex items-center gap-2">
                         <input 
                            type="checkbox" 
                            id="allow_customization"
                            checked={data.allow_customization}
                            onChange={e => setData('allow_customization', e.target.checked)}
                            className="rounded border-gray-300 text-black focus:ring-black"
                        />
                        <label htmlFor="allow_customization" className="text-sm font-medium">Allow Customization</label>
                    </div>

                    <div className="flex justify-end pt-6">
                        <button 
                            type="submit" 
                            disabled={processing}
                            className="bg-black text-white px-6 py-2 rounded-md text-sm font-bold hover:bg-gray-800 disabled:opacity-50 transition"
                        >
                            Create Draft
                        </button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
