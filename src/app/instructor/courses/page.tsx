import { InstructorRoute } from "@/components/common/instructor-route";
import { InstructorCoursesContent } from "@/features/instructor/components/instructor-courses-content";

export default function InstructorCoursesPage() {
    return (
        <InstructorRoute>
            <InstructorCoursesContent />
        </InstructorRoute>
    );
}