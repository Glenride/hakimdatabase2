import { Link, usePage } from '@inertiajs/react';
import { PropsWithChildren, useEffect, useState } from 'react';
import { SharedData } from '@/types';

export default function ShopLayout({ children }: PropsWithChildren) {
    const { auth, flash } = usePage<SharedData>().props;
    const [showFlash, setShowFlash] = useState(false);
    const [flashMessage, setFlashMessage] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

    useEffect(() => {
        if (flash?.success) {
            setFlashMessage({ type: 'success', message: flash.success });
            setShowFlash(true);
        } else if (flash?.error) {
            setFlashMessage({ type: 'error', message: flash.error });
            setShowFlash(true);
        }
    }, [flash]);

    useEffect(() => {
        if (showFlash) {
            const timer = setTimeout(() => setShowFlash(false), 5000);
            return () => clearTimeout(timer);
        }
    }, [showFlash]);

    return (
        <div className="min-h-screen bg-[#FDFDFC] text-[#1b1b18] font-sans selection:bg-black selection:text-white">
             <header className="border-b border-gray-100 py-6 px-6 sticky top-0 bg-white/90 backdrop-blur-md z-50">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <Link href="/" className="text-3xl font-serif font-bold tracking-tight">
                        PROVENANCE
                    </Link>
                    
                    <nav className="hidden md:flex gap-8 text-sm uppercase tracking-widest font-medium text-gray-600">
                        <Link href="/" className="hover:text-black transition">Shop</Link>
                        <Link href="/about" className="hover:text-black transition">About</Link>
                        <Link href="/collections" className="hover:text-black transition">Collections</Link>
                    </nav>

                    <div className="flex gap-6 items-center text-sm font-medium">
                         {auth.user ? (
                            <Link href={['admin', 'staff'].includes(auth.user.role || '') ? '/admin' : '/dashboard'} className="hover:text-gray-600">
                                {['admin', 'staff'].includes(auth.user.role || '') ? 'Admin' : 'Account'}
                            </Link>
                         ) : (
                            <Link href="/login" className="hover:text-gray-600">Login</Link>
                         )}
                         <button className="hover:text-gray-600">Cart (0)</button>
                    </div>
                </div>
             </header>

             {/* Flash Messages */}
             {showFlash && flashMessage && (
                <div className={`fixed top-20 right-6 z-50 px-6 py-4 rounded-lg shadow-lg transition-all duration-300 ${
                    flashMessage.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'
                }`}>
                    <div className="flex items-center gap-3">
                        <span className="text-sm font-medium">{flashMessage.message}</span>
                        <button onClick={() => setShowFlash(false)} className="text-gray-400 hover:text-gray-600">×</button>
                    </div>
                </div>
             )}

             <main>
                {children}
             </main>

             <footer className="bg-gray-50 py-20 px-6 border-t border-gray-100 mt-20">
                 <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
                    <div className="col-span-1 md:col-span-2">
                        <h4 className="font-serif text-2xl mb-4">PROVENANCE</h4>
                        <p className="text-sm text-gray-500 max-w-xs leading-relaxed">
                            Couture bridal by Senegalese-born designer Moctar Ba. Every gown has a history.
                        </p>
                    </div>
                    <div>
                        <h5 className="font-bold text-sm uppercase tracking-wider mb-4">Shop</h5>
                        <ul className="space-y-2 text-sm text-gray-500">
                            <li><Link href="/" className="hover:text-black">All Products</Link></li>
                            <li><Link href="/collections" className="hover:text-black">Collections</Link></li>
                            <li><Link href="/about" className="hover:text-black">About</Link></li>
                        </ul>
                    </div>
                    <div>
                         <h5 className="font-bold text-sm uppercase tracking-wider mb-4">Help</h5>
                         <ul className="space-y-2 text-sm text-gray-500">
                            <li><Link href="#" className="hover:text-black">Shipping & Returns</Link></li>
                            <li><Link href="#" className="hover:text-black">Size Guide</Link></li>
                            <li><Link href="#" className="hover:text-black">Contact Us</Link></li>
                         </ul>
                    </div>
                 </div>
                 <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-gray-200 text-xs text-center text-gray-400">
                    © {new Date().getFullYear()} Hakim. All rights reserved.
                 </div>
             </footer>
        </div>
    );
}
