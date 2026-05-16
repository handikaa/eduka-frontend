import { InstructorRoute } from "@/components/common/instructor-route";
import { InstructorCourseDetailContent } from "@/features/instructor/components/instructor-course-detail-content";

type InstructorCourseDetailPageProps = {
    params: Promise<{
        courseId: string;
    }>;
    searchParams?: Promise<{
        edit?: string;
    }>;
};

export default async function InstructorCourseDetailPage({
    params,
    searchParams,
}: InstructorCourseDetailPageProps) {
    const { courseId } = await params;
    const resolvedSearchParams = searchParams ? await searchParams : undefined;

    const isEditMode = resolvedSearchParams?.edit === "true";

    return (
        <InstructorRoute>
            <InstructorCourseDetailContent
                courseId={Number(courseId)}
                isEditMode={isEditMode}
            />
        </InstructorRoute>
    );
}