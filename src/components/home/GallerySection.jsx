import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { parseTools, parseHours, TOOL_COLORS, ICONS } from '../../lib/constants';
import './GallerySection.css';

export default function GallerySection({ data = [] }) {
    const [filter, setFilter] = useState('all');
    const [expanded, setExpanded] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-60px' });

    const uniqueTools = [...new Set(data.flatMap(row => parseTools(row['Which AI or new tools did you use?'])))];

    const filteredData = filter === 'all'
        ? data
        : data.filter(row => parseTools(row['Which AI or new tools did you use?']).includes(filter));

    const displayData = expanded ? filteredData : filteredData.slice(0, 6);

    return (
        <section id="gallery" className="gallery-section page-section" ref={ref}>
            <div className="container">
                <div className="gallery-header">
                    <span className="section-label" style={{ color: 'var(--accent-purple)' }}>REAL WORK, REAL IMPACT</span>
                    <h2 className="display-heading-sm">Innovation Gallery</h2>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 'var(--space-2xl)' }}>

                        <button className={`filter-tab ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>All Tools</button>
                        {uniqueTools.map(tool => (
                            <button key={tool} className={`filter-tab ${filter === tool ? 'active' : ''}`} onClick={() => setFilter(tool)}>{tool}</button>
                        ))}
                    </div>

                <div className="gallery-grid">
                    {displayData.map((row, i) => {
                        const tools = parseTools(row['Which AI or new tools did you use?']);
                        const mainTool = tools[0] || 'AI Tool';
                        const toolCfg = TOOL_COLORS[mainTool] || TOOL_COLORS.default;
                        const hours = parseHours(row['Estimated hours saved or impact realized'] || row['How many hours did AI save you this week?']);
                        const useCase = row['What was the use case or activity?'] || 'AI Innovation';
                        const name = row['Name'] || 'Anonymous';
                        const value = row['How did this use case create value for your team or client?'] || '';
                        const comfort = parseInt(row['What was your comfort level with AI tools this week?']) || 3;
                        const recommends = (row['Would you recommend this use case for others?'] || '').toLowerCase().includes('yes');

                        return (
                            <motion.div
                                key={i}
                                className="usecase-card glass-card"
                                initial={{ opacity: 0, y: 16 }}
                                animate={inView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.35, delay: Math.min(i * 0.05, 0.4) }}
                                whileHover={{ y: -4, boxShadow: '0 12px 40px rgba(74,222,128,0.1)' }}
                                onClick={() => setSelectedCard(row)}
                            >
                                <div className="uc-header">
                                    <span className={`tool-badge ${toolCfg.className}`}>{mainTool}</span>
                                    {recommends && <span className="recommend-chip">{ICONS.check} Rec</span>}
                                </div>
                                <h3 className="uc-title">{useCase.length > 80 ? useCase.substring(0, 80) + '...' : useCase}</h3>
                                <p className="uc-author">by {name}</p>
                                <p className="uc-desc">{value.length > 120 ? value.substring(0, 120) + '...' : value}</p>
                                <div className="uc-footer">
                                    <div className="uc-stat">
                                        <span className="uc-stat-value">{hours}</span>
                                        <span className="uc-stat-label">Hours</span>
                                    </div>
                                    <div className="comfort-mini">
                                        <div className="comfort-mini-track">
                                            <div className="comfort-mini-fill" style={{ width: `${(comfort / 5) * 100}%` }} />
                                        </div>
                                        <span className="comfort-mini-label">{comfort}/5</span>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {filteredData.length > 6 && (
                    <div className="gallery-toggle-container">
                        <button className="btn btn-secondary" onClick={() => setExpanded(!expanded)}>
                            {expanded ? 'Show Less' : `Show All ${filteredData.length} Use Cases`}
                        </button>
                    </div>
                )}
            </div>

            {/* Modal */}
            {selectedCard && (
                <div className="uc-modal-overlay" onClick={() => setSelectedCard(null)}>
                    <motion.div
                        className="uc-modal glass-card"
                        onClick={e => e.stopPropagation()}
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.25 }}
                    >
                        <button className="uc-modal-close" onClick={() => setSelectedCard(null)}>{ICONS.close}</button>
                        <h2>{selectedCard['What was the use case or activity?'] || 'AI Innovation'}</h2>
                        <p className="uc-modal-author">by {selectedCard['Name'] || 'Anonymous'}</p>
                        <div className="uc-modal-section">
                            <h4>Value Created</h4>
                            <p>{selectedCard['How did this use case create value for your team or client?'] || 'Not specified'}</p>
                        </div>
                        <div className="uc-modal-section">
                            <h4>Challenges</h4>
                            <p>{selectedCard['What challenges or barriers did you encounter?'] || 'None reported'}</p>
                        </div>
                    </motion.div>
                </div>
            )}
        </section>
    );
}
