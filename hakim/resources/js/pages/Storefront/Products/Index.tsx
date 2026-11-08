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
    category?: { name: string };
    status: string;
}

export default function Index({ products }: PageProps<{ products: { data: Product[] } }>) {
    const formatPrice = (cents: number, currency: string) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency,
        }).format(cents / 100);
    };

    return (
        <ShopLayout>
            <Head title="Shop" />

            {/* Hero */}
            <div className="relative bg-[#f3f0eb] py-24 px-6 mb-16">
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 items-center gap-12">
                    <div className="order-2 md:order-1">
                         <span className="text-xs font-bold tracking-widest uppercase text-gray-500 mb-4 block">New Collection</span>
                         <h1 className="text-5xl md:text-6xl font-serif mb-6 leading-tight">
                            Every gown has a history.
                         </h1>
                         <p className="text-lg text-gray-800 mb-6 font-medium">
                            Couture bridal by Senegalese-born designer Moctar Ba—crafted for brides who see their dress as a work of art with a traceable origin: theirs.
                         </p>
                         <p className="text-gray-600 mb-8 max-w-md">
                            PROVENANCE by Moctar Ba is a couture bridal atelier for women who won’t disappear into a template. Each gown is made-to-measure, never repeated, and born from a conversation about where you come from, what you’ve crossed, and who you are becoming.
                         </p>
                    </div>
                     <div className="order-1 md:order-2 relative">
                        <div className="aspect-[4/5] bg-white/50 rounded-full overflow-hidden max-w-sm mx-auto">
                             <img src="/storage/hero/hero-1.jpg" alt="Hero" className="w-full h-full object-cover" />
                        </div>
                     </div>
                </div>
            </div>

            {/* Section 1 - Provenance */}
            <div className="max-w-3xl mx-auto px-6 mb-24 text-center">
                <h2 className="font-serif text-3xl md:text-4xl mb-8">Provenance: The Story Behind the Silk</h2>
                <div className="prose prose-lg mx-auto text-gray-600">
                    <p className="mb-6">
                        In the art world, provenance is the history that makes a piece invaluable—who created it, where it has been, whose hands have held it. PROVENANCE by Moctar Ba treats a wedding gown the same way.
                    </p>
                    <p className="mb-6">
                        Your dress is not a number on a rack. It is a singular work of couture, carrying three intertwined stories:
                    </p>
                    <ul className="text-left max-w-md mx-auto list-disc pl-6 mb-6 space-y-2">
                        <li><strong>Yours</strong> – your origins, memories, and choices</li>
                        <li><strong>His</strong> – a Senegalese-born designer who brought his craft across continents</li>
                        <li><strong>Ours</strong> – the shared artistry and culture stitched into every seam</li>
                    </ul>
                    <p>
                        Every gown leaves the atelier with a clear, intimate sense of origin. A piece of living history, worn for one day, remembered for a lifetime.
                    </p>
                </div>
            </div>

            {/* Section 4 - About Teaser */}
            <div className="bg-gray-50 py-24 px-6 mb-24">
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
                    <div className="order-2 md:order-1">
                         <div className="aspect-[4/3] bg-gray-200 rounded-lg overflow-hidden">
                             {/* Placeholder for Moctar image */}
                             <div className="w-full h-full flex items-center justify-center text-gray-400">Moctar Ba</div>
                         </div>
                    </div>
                    <div className="order-1 md:order-2">
                        <h2 className="font-serif text-3xl md:text-4xl mb-6">From Dakar to Your Aisle</h2>
                        <p className="text-gray-600 mb-6">
                            Moctar Ba’s story is one of movement, growth, and devotion to craft. Trained under master tailors in Senegal and refined through his life as an immigrant in America, he brings the discipline of traditional African tailoring to contemporary couture.
                        </p>
                        <p className="text-gray-600 mb-8">
                            In his hands, a wedding gown becomes more than a dress. It becomes a record: of courage, culture, and the quiet decision to step into the life you’ve chosen.
                        </p>
                        <Link href="/about" className="inline-block border-b border-black pb-1 text-sm uppercase tracking-widest hover:text-gray-600 hover:border-gray-600 transition">
                            Read His Story
                        </Link>
                    </div>
                </div>
            </div>

            {/* Crossings Collection Intro & Product Grid */}
            <div className="max-w-7xl mx-auto px-6 mb-24">
                <div className="text-center mb-16">
                     <h2 className="font-serif text-4xl mb-4">CROSSINGS – What You’ve Crossed</h2>
                     <p className="text-xl text-gray-500 mb-8 max-w-2xl mx-auto">
                        Sculptural gowns for women who have moved through change and become more themselves.
                     </p>
                     <p className="text-gray-600 max-w-3xl mx-auto">
                        CROSSINGS is one of Moctar’s most personal lenses on provenance. These gowns are for brides who carry stories of change—migration, reinvention, new beginnings. Sharp lines, bold structures, and transformative details honor the courage it takes to move from one chapter of life into another.
                     </p>
                </div>
                
                {products.data.length === 0 ? (
                    <div className="text-center py-12 text-gray-500">
                        No products found. Check back soon!
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
                                        <div className="w-full h-full flex items-center justify-center text-gray-300 bg-gray-50">No Image</div>
                                    )}
                                </div>
                                <div>
                                    <h3 className="font-serif text-lg mb-1 group-hover:underline decoration-1 underline-offset-4">{product.title}</h3>
                                    <p className="text-sm text-gray-500">{formatPrice(product.price_cents, product.currency)}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </ShopLayout>
    );
}
