import { motion } from 'framer-motion';
import Hero from '../components/home/Hero';
import About from '../components/home/About';
import PodsSection from '../components/home/PodsSection';
import LeaderboardSection from '../components/home/LeaderboardSection';
import AnalyticsPanel from '../components/home/AnalyticsPanel';
import GallerySection from '../components/home/GallerySection';
import JoinForm from '../components/home/JoinForm';
import SubmitForm from '../components/home/SubmitForm';
import FloatingLeaves from '../components/home/FloatingLeaves';
import TickerMarquee from '../components/home/TickerMarquee';

const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.2 } },
};

export default function HomePage() {
    return (
        <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
            {/* Floating leaves overlay — atmospheric particles */}
            <FloatingLeaves count={10} />

            {/* ─── Hero ─── */}
            <Hero />

            {/* ─── Accent Ticker ─── */}
            <TickerMarquee variant="accent" speed={35} />

            {/* ─── About (cream bg) ─── */}
            <About />

            {/* ─── Light Ticker ─── */}
            <TickerMarquee
                variant="light"
                speed={40}
                items={[
                    '15 ACTIVE PODS',
                    '90+ INNOVATORS',
                    'PHASE 3 IN PROGRESS',
                    'PEER-DRIVEN LEARNING',
                    'REAL CONSULTING IMPACT',
                ]}
            />

            {/* ─── Pods (cream bg) ─── */}
            <PodsSection />

            {/* ─── Gold Ticker (transition to dark) ─── */}
            <TickerMarquee
                variant="gold"
                speed={28}
                items={[
                    'HOURS SAVED WITH AI',
                    'ORGANIC TECH MASTERY',
                    'NERD-TO-NERD LEARNING',
                    'INNOVATION AT SCALE',
                    'ACCENTURE S&C',
                ]}
            />

            {/* ─── Leaderboard (dark bg) ─── */}
            <LeaderboardSection />

            {/* ─── Dark Ticker ─── */}
            <TickerMarquee variant="dark" speed={45} />

            {/* ─── Analytics (dark bg) ─── */}
            <AnalyticsPanel />

            {/* ─── Gallery (dark bg) ─── */}
            <GallerySection />

            {/* ─── Join & Submit (dark bg) ─── */}
            <JoinForm />
            <SubmitForm />
        </motion.div>
    );
}
