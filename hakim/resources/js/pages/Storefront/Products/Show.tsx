import ShopLayout from '@/layouts/shop-layout';
import { store as checkoutStore } from '@/routes/checkout';
import { SharedData } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import { useState } from 'react';

interface Product {
    id: number;
    title: string;
    description: string;
    slug: string;
    price_cents: number;
    currency: string;
    status: string;
    images: { path: string; id: number }[];
    sizes: { id: number; label: string; available: boolean }[];
    allow_customization: boolean;
}

export default function Show({ product }: { product: Product }) {
    const { auth } = usePage<SharedData>().props;
    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const [customization, setCustomization] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    
    const handleAddToCart = () => {
        // Check if user is logged in first
        if (!auth.user) {
            router.visit('/login', {
                data: { redirect: `/products/${product.slug}` },
            });
            return;
        }
        
        setIsLoading(true);
        router.post(checkoutStore({ product: product.slug }).url, {
            size: selectedSize,
            customization: customization
        }, {
            onFinish: () => setIsLoading(false),
        });
    };

    const formatPrice = (cents: number, currency: string) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency,
        }).format(cents / 100);
    };

    return (
        <ShopLayout>
            <Head title={product.title} />
            
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Gallery */}
                    <div className="space-y-4">
                        <div className="aspect-[4/5] bg-gray-100 overflow-hidden">
                             {product.images[selectedImageIndex] ? (
                                <img src={`/storage/${product.images[selectedImageIndex].path}`} alt={product.title} className="w-full h-full object-cover" />
                             ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-50">No Image</div>
                             )}
                        </div>
                        {/* Thumbnails */}
                        {product.images.length > 1 && (
                             <div className="grid grid-cols-4 gap-4">
                                {product.images.map((img, index) => (
                                    <div 
                                        key={img.id} 
                                        className={`aspect-[4/5] bg-gray-100 cursor-pointer hover:opacity-80 transition ${selectedImageIndex === index ? 'ring-2 ring-black' : ''}`}
                                        onClick={() => setSelectedImageIndex(index)}
                                    >
                                        <img src={`/storage/${img.path}`} alt="" className="w-full h-full object-cover" />
                                    </div>
                                ))}
                             </div>
                        )}
                    </div>

                    {/* Details */}
                    <div>
                        <h1 className="font-serif text-4xl mb-2">{product.title}</h1>
                        <p className="text-xl text-gray-600 mb-8">{formatPrice(product.price_cents, product.currency)}</p>
                        
                        <div className="prose prose-sm text-gray-500 mb-8 leading-relaxed">
                            <p>{product.description}</p>
                        </div>

                        {product.status === 'sold' ? (
                             <div className="bg-gray-100 text-gray-500 px-6 py-4 text-center font-bold uppercase tracking-widest mb-8">
                                 Sold Out
                             </div>
                        ) : (
                            <form className="space-y-8">
                                {/* Sizes */}
                                {product.sizes.length > 0 && (
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-widest mb-3">Size</label>
                                        <div className="flex gap-2 flex-wrap">
                                            {product.sizes.map(size => (
                                                <button
                                                    key={size.id}
                                                    type="button"
                                                    disabled={!size.available}
                                                    onClick={() => setSelectedSize(size.label)}
                                                    className={`w-12 h-12 border flex items-center justify-center text-sm transition
                                                        ${selectedSize === size.label ? 'border-black bg-black text-white' : 'border-gray-200 hover:border-black'}
                                                        ${!size.available ? 'opacity-50 cursor-not-allowed line-through bg-gray-50' : ''}
                                                    `}
                                                >
                                                    {size.label}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Customization */}
                                {product.allow_customization && (
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-widest mb-3">Customization Notes</label>
                                        <textarea 
                                            className="w-full border-gray-200 focus:border-black focus:ring-0 text-sm p-3 bg-gray-50"
                                            rows={3}
                                            placeholder="Enter hem adjustments or sleeve tweaks here..."
                                            value={customization}
                                            onChange={e => setCustomization(e.target.value)}
                                        />
                                        <p className="text-xs text-gray-400 mt-2">Optional. Leave blank if no changes needed.</p>
                                    </div>
                                )}

                                <button 
                                    type="button"
                                    onClick={handleAddToCart}
                                    className="w-full bg-[#1b1b18] text-white py-4 uppercase tracking-widest text-sm font-bold hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
                                    disabled={isLoading || (!selectedSize && product.sizes.length > 0)}
                                >
                                    {isLoading ? 'Processing...' : (auth.user ? 'Proceed to Checkout' : 'Sign In to Purchase')}
                                </button>
                            </form>
                        )}

                        <div className="mt-12 pt-12 border-t border-gray-100 space-y-4">
                            <div className="flex justify-between text-sm cursor-pointer border-b border-gray-100 pb-4 group">
                                <span className="group-hover:text-gray-600">Size Guide</span>
                                <span>+</span>
                            </div>
                            <div className="flex justify-between text-sm cursor-pointer border-b border-gray-100 pb-4 group">
                                <span className="group-hover:text-gray-600">Shipping & Returns</span>
                                <span>+</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ShopLayout>
    );
}
