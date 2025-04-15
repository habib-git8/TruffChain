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
        title: 'Schedule Appointments',
        description:
            'Book appointments 24/7 from any device, eliminating phone calls and back-and-forth emails.',
    },
    {
        Icon: CalendarClockIcon,
        title: 'Calendar Sync',
        description:
            'Availly seamlessly integrates with your existing calendar, keeping all your appointments in one centralized location.',
    },
    {
        Icon: BellRingIcon,
        title: 'Automated Reminders',
        description:
            "Set automated appointment reminders to ensure you're always on time and avoid missed appointments.",
    },
    {
        Icon: ListChecksIcon,
        title: 'Customizable Services',
        description:
            'Reduce time spent on appointment scheduling and follow-ups, allowing you to focus on what matters most.',
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
