import './FloatingLeaves.css';

/* SVG leaf paths — elegant botanical silhouettes, no emojis */
const LEAF_VARIANTS = [
    // Simple leaf
    <svg viewBox="0 0 24 24" fill="currentColor" opacity="0.6"><path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66L7 18l4-2 4 2 1.3 4 1.88-.66C16.1 16.17 14 10 17 8z" /><path d="M12 2a5.5 5.5 0 0 0 0 8" /><path d="M12 2a5.5 5.5 0 0 1 0 8" /></svg>,
    // Fern frond
    <svg viewBox="0 0 24 24" fill="currentColor" opacity="0.5"><path d="M12 22V2" /><path d="M5 8c2.5-1 4.5 0 5 2" /><path d="M19 8c-2.5-1-4.5 0-5 2" /><path d="M6 13c2-1 3.5 0 4 1.5" /><path d="M18 13c-2-1-3.5 0-4 1.5" /><path d="M7 17c1.5-.5 2.5.5 3 1.5" /><path d="M17 17c-1.5-.5-2.5.5-3 1.5" /></svg>,
    // Round leaf
    <svg viewBox="0 0 24 24" fill="currentColor" opacity="0.4"><ellipse cx="12" cy="10" rx="7" ry="9" /><path d="M12 2v20" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" fill="none"/></svg>,
    // Simple petal
    <svg viewBox="0 0 20 20" fill="currentColor" opacity="0.5"><path d="M10 2C6 2 2 6 2 10s4 8 8 8c0-4 0-12 0-16z" /></svg>,
    // Teardrop
    <svg viewBox="0 0 20 20" fill="currentColor" opacity="0.35"><path d="M10 2C7 6 4 9 4 12a6 6 0 0 0 12 0c0-3-3-6-6-10z" /></svg>,
];

export default function FloatingLeaves({ count = 12 }) {
    const leaves = Array.from({ length: count }, (_, i) => ({
        id: i,
        variant: LEAF_VARIANTS[i % LEAF_VARIANTS.length],
        left: `${5 + Math.random() * 90}%`,
        animDuration: 18 + Math.random() * 25,
        animDelay: Math.random() * 20,
        size: 16 + Math.random() * 20,
        swayDuration: 3 + Math.random() * 5,
    }));

    return (
        <div className="floating-leaves" aria-hidden="true">
            {leaves.map(leaf => (
                <span
                    key={leaf.id}
                    className="floating-leaf"
                    style={{
                        left: leaf.left,
                        width: `${leaf.size}px`,
                        height: `${leaf.size}px`,
                        animationDuration: `${leaf.animDuration}s`,
                        animationDelay: `${leaf.animDelay}s`,
                        '--sway-duration': `${leaf.swayDuration}s`,
                        color: `hsla(${140 + Math.random() * 40}, 70%, 60%, 0.35)`,
                    }}
                >
                    {leaf.variant}
                </span>
            ))}
        </div>
    );
}
