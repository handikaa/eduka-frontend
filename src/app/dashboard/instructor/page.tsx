import { InstructorRoute } from "@/components/common/instructor-route";
import { InstructorDashboardContent } from "@/features/instructor/components/instructor-dashboard-content";

export default function InstructorDashboardPage() {
    return (
        <InstructorRoute>
            <InstructorDashboardContent />
        </InstructorRoute>
    );
}