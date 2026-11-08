import ShopLayout from '@/layouts/shop-layout';
import { Head, Link } from '@inertiajs/react';
import { PageProps } from '@/types';

interface Product {
    id: number;
    title: string;
    price_cents: number;
    currency: string;
    slug: string;
    images: { path: string }[];
    status: string;
}

interface Collection {
    id: number;
    name: string;
    slug: string;
    description: string | null;
}

// Collection-specific content based on copy.md
const collectionContent: Record<string, {
    heroImage: string;
    tagline: string;
    intro: string;
    features: string[];
}> = {
    crossings: {
        heroImage: '/storage/collections/crossings-hero.jpg',
        tagline: 'What You\'ve Crossed',
        intro: 'CROSSINGS is one of Moctar\'s most personal lenses on provenance. These gowns are for brides who carry stories of change—migration, reinvention, new beginnings. Sharp lines, bold structures, and transformative details honor the courage it takes to move from one chapter of life into another.',
        features: [
            'Architectural silhouettes with movement and edge',
            'Layering and reveal elements—overskirts, capes, removable sleeves',
            'Contrasts of sheer and solid, soft and strong, reflecting inner evolution',
        ],
    },
    origins: {
        heroImage: '/storage/collections/origins-hero.jpg',
        tagline: 'Where You Begin',
        intro: 'ORIGINS celebrates the foundation of identity—the places, people, and traditions that shape who we become. These gowns honor ancestry through timeless silhouettes and subtle details that speak to heritage without overshadowing the bride.',
        features: [
            'Classic silhouettes reimagined with modern restraint',
            'Intricate hand-worked details inspired by traditional craftsmanship',
            'Fabrics that honor textile traditions from around the world',
        ],
    },
    heritage: {
        heroImage: '/storage/collections/heritage-hero.jpg',
        tagline: 'What You Carry',
        intro: 'HERITAGE explores the traditions we carry forward—the cultural threads that weave through generations. Each gown in this collection is a conversation between past and present, honoring legacy while stepping boldly into the future.',
        features: [
            'Cultural motifs integrated with contemporary design',
            'Traditional techniques meeting modern construction',
            'Designs that honor family legacy while celebrating individual identity',
        ],
    },
};

export default function Show({ 
    collection, 
    products 
}: PageProps<{ 
    collection: Collection; 
    products: { data: Product[] } 
}>) {
    const content = collectionContent[collection.slug] || {
        heroImage: '/storage/collections/default-hero.jpg',
        tagline: collection.name,
        intro: collection.description || 'Explore this collection of couture gowns.',
        features: [],
    };

    const formatPrice = (cents: number, currency: string) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency,
        }).format(cents / 100);
    };

    return (
        <ShopLayout>
            <Head title={`${collection.name} Collection`} />

            {/* Hero */}
            <div className="relative h-[70vh] min-h-[500px] mb-16">
                <div className="absolute inset-0">
                    <img
                        src={content.heroImage}
                        alt={collection.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = 'https://images.unsplash.com/photo-1594552072238-b8a33785b261?w=1920&q=80';
                        }}
                    />
                    <div className="absolute inset-0 bg-black/40" />
                </div>
                <div className="relative h-full flex flex-col items-center justify-center text-white text-center px-6">
                    <span className="text-sm tracking-widest uppercase mb-4 opacity-80">Collection</span>
                    <h1 className="font-serif text-5xl md:text-7xl mb-4 tracking-wide">
                        {collection.name.toUpperCase()}
                    </h1>
                    <p className="text-xl md:text-2xl tracking-wide opacity-90">
                        {content.tagline}
                    </p>
                </div>
            </div>

            {/* Introduction */}
            <div className="max-w-3xl mx-auto px-6 mb-20 text-center">
                <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-8">
                    {content.intro}
                </p>
                
                {content.features.length > 0 && (
                    <div className="bg-gray-50 p-8 rounded-lg">
                        <h3 className="font-serif text-xl mb-6 text-gray-800">
                            What Defines {collection.name.toUpperCase()}
                        </h3>
                        <ul className="space-y-3 text-gray-600">
                            {content.features.map((feature, index) => (
                                <li key={index} className="flex items-start justify-center gap-3">
                                    <span className="text-gray-400 mt-1">—</span>
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            {/* Products Grid */}
            <div className="max-w-7xl mx-auto px-6 mb-24">
                <h2 className="font-serif text-3xl text-center mb-12">Gowns from {collection.name}</h2>
                
                {products.data.length === 0 ? (
                    <div className="text-center py-12 text-gray-500">
                        <p className="mb-4">No gowns currently available in this collection.</p>
                        <Link 
                            href="/collections" 
                            className="inline-block border-b border-black pb-1 text-sm uppercase tracking-widest hover:text-gray-600 hover:border-gray-600 transition"
                        >
                            View All Collections
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                        {products.data.map((product) => (
                            <Link href={`/products/${product.slug}`} key={product.id} className="group block">
                                <div className="relative aspect-[4/5] bg-gray-100 overflow-hidden mb-4">
                                    {product.status === 'sold' && (
                                        <div className="absolute top-4 left-4 bg-white/90 px-3 py-1 text-xs uppercase tracking-widest font-bold z-10">
                                            Sold
                                        </div>
                                    )}
                                    {product.images[0] ? (
                                        <img
                                            src={`/storage/${product.images[0].path}`}
                                            alt={product.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-300 bg-gray-50">
                                            No Image
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <h3 className="font-serif text-lg mb-1 group-hover:underline decoration-1 underline-offset-4">
                                        {product.title}
                                    </h3>
                                    <p className="text-sm text-gray-500">
                                        {formatPrice(product.price_cents, product.currency)}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>

            {/* Other Collections CTA */}
            <div className="bg-[#f3f0eb] py-20 px-6">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="font-serif text-2xl md:text-3xl mb-4">Explore Other Collections</h2>
                    <p className="text-gray-600 mb-8">
                        Each collection offers a unique perspective on identity, heritage, and transformation.
                    </p>
                    <Link
                        href="/collections"
                        className="inline-block border border-black px-8 py-3 text-sm uppercase tracking-widest hover:bg-black hover:text-white transition"
                    >
                        View All Collections
                    </Link>
                </div>
            </div>
        </ShopLayout>
    );
}
