import './TickerMarquee.css';

/* Leaf SVG separator between ticker phrases */
const LeafSep = () => (
    <svg className="ticker-sep-icon" viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
        <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66L7 18l4-2 4 2 1.3 4 1.88-.66C16.1 16.17 14 10 17 8z" />
        <path d="M12 2a5.5 5.5 0 0 0 0 8" />
        <path d="M12 2a5.5 5.5 0 0 1 0 8" />
    </svg>
);

export default function TickerMarquee({
    items = [
        'CULTIVATING AI',
        'GROWING INNOVATION',
        'BOTANY × ACCENTURE',
        'BUILDING ORGANIC TECH',
        'AI NERD ENRICHMENT',
    ],
    speed = 30,
    variant = 'dark',
}) {
    const renderItems = () => items.map((item, i) => (
        <span key={i} className="ticker-item">
            <LeafSep /> <span>{item}</span>
        </span>
    ));

    return (
        <div className={`ticker-marquee ticker-${variant}`} aria-hidden="true">
            <div
                className="ticker-track"
                style={{ animationDuration: `${speed}s` }}
            >
                <span className="ticker-content">{renderItems()}</span>
                <span className="ticker-content">{renderItems()}</span>
                <span className="ticker-content">{renderItems()}</span>
                <span className="ticker-content">{renderItems()}</span>
            </div>
        </div>
    );
}
