
import {  UserData } from "@/app/types/dashbord";

interface WelcomeSectionProps {
  user: UserData;
}

export function WelcomeSection({ user }: WelcomeSectionProps) {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <div className="mb-8">
      <h2 className="text-3xl font-bold mb-2">
        {getGreeting()}, {user.name.split(' ')[2]}! 👋
      </h2>
      <p className="text-gray-300">Ready to continue your JAMB preparation journey?</p>
    </div>
  );
}