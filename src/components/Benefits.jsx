import {
    BellRingIcon,
    CalendarClockIcon,
    ClockIcon,
    ListChecksIcon,
} from 'lucide-react';
import BenefitCard from './BenefitCard';


const benifitItems = [
    {
        Icon: ClockIcon,
        title: 'Book Turfs Anytime',
        description:
            'Easily schedule turf bookings 24/7 from any device—no more phone calls or long wait times.',
    },
    {
        Icon: CalendarClockIcon,
        title: ' Smart Calendar Integration',
        description:
            'TurfChain syncs with your preferred calendar so all your bookings stay organized in one place.',
    },
    {
        Icon: BellRingIcon,
        title: 'Instant Notifications',
        description:
            "Get real-time alerts and booking confirmations, ensuring you're always updated and never miss a session.",
    },
    {
        Icon: ListChecksIcon,
        title: 'Flexible Turf Options',
        description:
            'Browse and book from a range of customizable turf slots and services, making the experience smooth and personalized.',
    },
];

export default function Benefits() {
    return (
        <section className="wrapper container bg-gradient-to-r from-gray-200 to-primary/40 py-14">
            <h1 className="scroll-m-20 text-center text-4xl font-bold tracking-tight text-[#424242] lg:text-5xl">
                Benefits
            </h1>
            <div className="mt-2 flex flex-wrap justify-center gap-8 py-4">
                {benifitItems.map((item, index) => (
                    <BenefitCard
                        key={index}
                        Icon={item.Icon}
                        description={item.description}
                        title={item.title}
                    />
                ))}
            </div>
        </section>
    );
}
