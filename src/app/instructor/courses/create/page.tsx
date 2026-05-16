import { InstructorRoute } from "@/components/common/instructor-route";
import { InstructorCourseCreateContent } from "@/features/instructor/components/instructor-course-create-content";

export default function InstructorCourseCreatePage() {
    return (
        <InstructorRoute>
            <InstructorCourseCreateContent />
        </InstructorRoute>
    );
}