import ShopLayout from '@/layouts/shop-layout';
import { Head, Link } from '@inertiajs/react';

export default function Success({ sessionId }: { sessionId: string }) {
    return (
        <ShopLayout>
            <Head title="Order Confirmed" />
            <div className="max-w-2xl mx-auto py-24 px-6 text-center">
                <div className="mb-8 flex justify-center">
                    <div className="h-24 w-24 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                    </div>
                </div>
                <h1 className="font-serif text-4xl mb-4">Your gown’s provenance begins now.</h1>
                <p className="text-gray-600 mb-8">
                    Thank you for your commission. We will be in touch shortly to confirm details and begin the journey of your dress.
                </p>
                <Link href="/" className="inline-block bg-black text-white px-8 py-3 text-sm uppercase tracking-widest font-bold hover:bg-gray-800 transition">
                    Continue Shopping
                </Link>
            </div>
        </ShopLayout>
    );
}
