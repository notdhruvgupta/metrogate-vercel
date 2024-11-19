import Footer from "../components/footer";
import Navbar from "../components/navbar";

export async function generateMetadata() {
    
    return {
        title: 'Metrogate Blog',
        description: 'Your go-to resource for all things related to navigating the Delhi metro.',
        alternates: {
            canonical: 'https://metrogate.in/blog',
        },
    };
}

export default function BlogLayout({
    children,
}) {
    return (
        <section className="min-h-[80vh] font-newBarlow">
            {children}
        </section>
    )
}