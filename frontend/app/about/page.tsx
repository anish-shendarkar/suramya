'use client';

export default function AboutPage() {
    return (
        <div className="flex container mx-auto p-6 text-center justify-center items-center flex-col">
            <h1 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-rose-300 from-40% to-purple-400 to-80%">About Us</h1>
            <section className="text-lg w-[40%] text-justify text-slate-600">
                <h2 className="text-xl font-semibold text-rose-400">Dress to Impress, Rent with Ease</h2>

                <section className="mt-4">At Suramya, we believe that style should be accessible, sustainable, and hassle-free. Whether it's a wedding, a party, or a formal event, we provide a curated collection of high-quality outfits for rent, so you can look your best without the commitment of ownership.
                </section>

                <section className="mt-4">
                <h2 className="text-xl font-semibold text-rose-400">Why Choose Us?</h2>
                    <ul className="list-disc list-inside mt-4">
                        <li>Affordable Luxury – Wear premium outfits without the hefty price tag.</li>
                        <li>Sustainable Fashion – Reduce waste and contribute to a greener future.</li>
                        <li>Variety for Every Occasion – From ethnic wear to trendy western outfits, we have it all.</li>
                        <li>Hassle-Free Rentals – Simple booking, doorstep delivery, and easy returns.</li>
                    </ul>
                </section>
                <section className="mt-4">
                    <h2 className="text-xl font-semibold text-rose-400 mb-4">Our Mission</h2>

                    We aim to revolutionize the way people experience fashion by offering stylish, high-quality outfits for rent. Our goal is to make fashion more sustainable, reduce wardrobe clutter, and give everyone the chance to dress their best for every occasion.
                    Join the Fashion Revolution

                    Explore our collection, rent your dream outfit, and make a statement without breaking the bank. Because at [Your Website Name], every outfit tells a story—make yours unforgettable!
                </section>
            </section>
        </div>
    );
}