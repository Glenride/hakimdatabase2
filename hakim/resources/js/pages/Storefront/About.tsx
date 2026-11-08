import ShopLayout from '@/layouts/shop-layout';
import { Head, Link } from '@inertiajs/react';

export default function About() {
    return (
        <ShopLayout>
            <Head title="About Moctar Ba" />

            {/* Hero with Background Image */}
            <div className="relative h-[60vh] min-h-[500px] mb-16">
                <div className="absolute inset-0">
                    <img
                        src="/storage/about/hero.jpg"
                        alt="Moctar Ba at work"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80';
                        }}
                    />
                    <div className="absolute inset-0 bg-black/50" />
                </div>
                <div className="relative h-full flex flex-col items-center justify-center text-white text-center px-6">
                    <h1 className="text-4xl md:text-6xl font-serif mb-6 leading-tight">
                        The Provenance of a Designer
                    </h1>
                    <p className="text-xl md:text-2xl opacity-90 max-w-2xl">
                        From Senegalese tailoring rooms to a quiet atelier in America, Moctar Ba's journey is stitched into every gown he creates.
                    </p>
                </div>
            </div>

            {/* Section 1 - Early Origins */}
            <div className="max-w-7xl mx-auto px-6 mb-24">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="order-2 md:order-1">
                        <div className="aspect-[4/5] overflow-hidden rounded-lg">
                            <img
                                src="/storage/about/dakar.jpg"
                                alt="Traditional African tailoring"
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.src = 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800&q=80';
                                }}
                            />
                        </div>
                    </div>
                    <div className="order-1 md:order-2">
                        <h2 className="font-serif text-3xl md:text-4xl mb-6">Dakar: Where Fabric Was Language</h2>
                        <div className="prose prose-lg text-gray-600">
                            <p className="mb-6">
                                Moctar Ba grew up in Senegal, where garments were never anonymous. Fabric spoke of family. Embroidery revealed region. A perfect seam said as much about the maker's discipline as it did about their skill.
                            </p>
                            <p>
                                As a young apprentice, Moctar learned under master tailors who measured by eye and corrected a line with a single glance. They taught him that craftsmanship is a form of respect—for the person wearing the garment, for the culture it comes from, and for the moment it honors.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Section 2 - Across Continents */}
            <div className="bg-gray-50 py-24 px-6 mb-24">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="font-serif text-3xl md:text-4xl mb-6">Crossing Oceans, Keeping Craft</h2>
                            <div className="prose prose-lg text-gray-600">
                                <p className="mb-6">
                                    Drawn by new possibilities, Moctar left Senegal for America, carrying with him a pair of trained hands, a sketchbook, and a clear sense of purpose.
                                </p>
                                <p>
                                    In his new country, his name and story were unfamiliar, but his work was unmistakable. Between long days and late nights at the sewing machine, he continued to refine his art—blending the geometry of Dakar, the textures of traditional cloth, and the quiet discipline of his teachers with a modern, global sensibility.
                                </p>
                            </div>
                        </div>
                        <div>
                            <div className="aspect-[4/5] overflow-hidden rounded-lg">
                                <img
                                    src="/storage/about/atelier.jpg"
                                    alt="Atelier workspace"
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        target.src = 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80';
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Section 3 - The Birth of Provenance */}
            <div className="max-w-7xl mx-auto px-6 mb-24">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="order-2 md:order-1">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="aspect-[3/4] overflow-hidden rounded-lg">
                                <img
                                    src="/storage/about/detail-1.jpg"
                                    alt="Gown detail"
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        target.src = 'https://images.unsplash.com/photo-1594552072238-b8a33785b261?w=400&q=80';
                                    }}
                                />
                            </div>
                            <div className="aspect-[3/4] overflow-hidden rounded-lg mt-8">
                                <img
                                    src="/storage/about/detail-2.jpg"
                                    alt="Fabric detail"
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        target.src = 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400&q=80';
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="order-1 md:order-2">
                        <h2 className="font-serif text-3xl md:text-4xl mb-6">A Gown as a Record</h2>
                        <div className="prose prose-lg text-gray-600">
                            <p className="mb-6">
                                In this crossing between homelands, PROVENANCE took shape.
                            </p>
                            <p className="mb-6">
                                Moctar realized that what moved him most about couture was not spectacle, but story: the way a gown could hold memory, ancestry, and identity. He envisioned a bridal atelier where every dress would have a clear, intimate history:
                            </p>
                            <ul className="list-disc pl-6 space-y-2 mb-6">
                                <li>A bride's lived experience</li>
                                <li>A designer's heritage and journey</li>
                                <li>A shared craft bridging continents</li>
                            </ul>
                            <p>
                                PROVENANCE by Moctar Ba honors that vision: each gown treated like a work of art with a traceable soul.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Section 4 - Design Philosophy */}
            <div className="bg-[#f3f0eb] py-24 px-6 mb-24">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="font-serif text-3xl md:text-4xl mb-8">Couture as Living History</h2>
                    <p className="text-lg text-gray-600 mb-10">
                        For Moctar, couture is not about excess. It is about precision and meaning.
                    </p>
                    <div className="grid md:grid-cols-3 gap-8 mb-12">
                        <div className="bg-white p-8 rounded-lg">
                            <h3 className="font-serif text-xl mb-3">No Templates</h3>
                            <p className="text-gray-600 text-sm">
                                Every pattern begins with a bride, not a sketchbook.
                            </p>
                        </div>
                        <div className="bg-white p-8 rounded-lg">
                            <h3 className="font-serif text-xl mb-3">Subtle Heritage</h3>
                            <p className="text-gray-600 text-sm">
                                Senegal is present in line, structure, and detail—never as costume.
                            </p>
                        </div>
                        <div className="bg-white p-8 rounded-lg">
                            <h3 className="font-serif text-xl mb-3">One-of-One</h3>
                            <p className="text-gray-600 text-sm">
                                Once a gown is finished, its pattern is archived or retired. Your dress will never be replicated.
                            </p>
                        </div>
                    </div>
                    <p className="text-xl font-medium text-gray-800 italic max-w-xl mx-auto">
                        Your gown is not just what you wear when you say "I do."<br />
                        It is the way your story chooses to be seen.
                    </p>
                </div>
            </div>

            {/* CTA Section */}
            <div className="max-w-3xl mx-auto px-6 mb-24 text-center">
                <h2 className="font-serif text-3xl mb-6">Begin Your Journey</h2>
                <p className="text-gray-600 mb-8">
                    Every PROVENANCE gown starts with a conversation about where you come from, what you've crossed, and who you are becoming.
                </p>
                <Link
                    href="/collections"
                    className="inline-block bg-black text-white px-8 py-4 text-sm uppercase tracking-widest hover:bg-gray-800 transition"
                >
                    Explore Collections
                </Link>
            </div>

        </ShopLayout>
    );
}
