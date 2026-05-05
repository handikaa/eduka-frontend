import { CourseDetailPreviewPage } from "@/features/course/components/course-detail-preview-page";

type CourseDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function CourseDetailPage({
  params,
}: CourseDetailPageProps) {
  const { slug } = await params;

  return <CourseDetailPreviewPage slug={slug} />;
}