import ShopLayout from '@/layouts/shop-layout';
import { Head, Link } from '@inertiajs/react';
import { PageProps } from '@/types';

interface Collection {
    id: number;
    name: string;
    slug: string;
    description: string | null;
    products_count: number;
}

// Collection data with imagery and descriptions
const collectionMeta: Record<string, { image: string; tagline: string; description: string }> = {
    crossings: {
        image: '/storage/collections/crossings.jpg',
        tagline: 'What You\'ve Crossed',
        description: 'Sculptural gowns for women who have moved through change and become more themselves.',
    },
    origins: {
        image: '/storage/collections/origins.jpg',
        tagline: 'Where You Begin',
        description: 'Timeless silhouettes honoring heritage, ancestry, and the roots that shape us.',
    },
    heritage: {
        image: '/storage/collections/heritage.jpg',
        tagline: 'What You Carry',
        description: 'Gowns that weave cultural heritage into contemporary bridal design.',
    },
};

export default function Index({ collections }: PageProps<{ collections: Collection[] }>) {
    return (
        <ShopLayout>
            <Head title="Collections" />

            {/* Hero */}
            <div className="relative bg-[#f3f0eb] py-24 px-6 mb-16">
                <div className="max-w-4xl mx-auto text-center">
                    <span className="text-xs font-bold tracking-widest uppercase text-gray-500 mb-4 block">
                        Explore
                    </span>
                    <h1 className="text-4xl md:text-5xl font-serif mb-6 leading-tight">
                        Our Collections
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Each collection represents a distinct lens on provenance—a unique perspective on identity, heritage, and transformation expressed through couture.
                    </p>
                </div>
            </div>

            {/* Collections Grid */}
            <div className="max-w-7xl mx-auto px-6 mb-24">
                {collections.length === 0 ? (
                    <div className="text-center py-12 text-gray-500">
                        Collections coming soon. Check back later.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {collections.map((collection) => {
                            const meta = collectionMeta[collection.slug] || {
                                image: '/storage/collections/default.jpg',
                                tagline: collection.name,
                                description: collection.description || 'Explore this collection.',
                            };
                            
                            return (
                                <Link
                                    href={`/collections/${collection.slug}`}
                                    key={collection.id}
                                    className="group block"
                                >
                                    <div className="relative aspect-[3/4] bg-gray-100 overflow-hidden mb-6">
                                        <img
                                            src={meta.image}
                                            alt={collection.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                                            onError={(e) => {
                                                const target = e.target as HTMLImageElement;
                                                target.src = 'https://images.unsplash.com/photo-1594552072238-b8a33785b261?w=800&q=80';
                                            }}
                                        />
                                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition duration-300" />
                                        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-6">
                                            <h2 className="font-serif text-3xl md:text-4xl mb-2 tracking-wide">
                                                {collection.name.toUpperCase()}
                                            </h2>
                                            <p className="text-sm tracking-widest uppercase opacity-90">
                                                {meta.tagline}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-gray-600 mb-2">{meta.description}</p>
                                        <span className="text-sm text-gray-400">
                                            {collection.products_count} {collection.products_count === 1 ? 'gown' : 'gowns'}
                                        </span>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* CTA Section */}
            <div className="bg-gray-50 py-24 px-6 mb-0">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="font-serif text-3xl md:text-4xl mb-6">Begin Your Journey</h2>
                    <p className="text-gray-600 mb-8">
                        Every PROVENANCE gown starts with a conversation. Whether you're drawn to a particular collection or still discovering your vision, we'd love to hear your story.
                    </p>
                    <Link
                        href="/about"
                        className="inline-block bg-black text-white px-8 py-4 text-sm uppercase tracking-widest hover:bg-gray-800 transition"
                    >
                        Meet the Designer
                    </Link>
                </div>
            </div>
        </ShopLayout>
    );
}
