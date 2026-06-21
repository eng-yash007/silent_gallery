import Header from "@/components/Header";
import { getFullEmail } from "@/app/actions/mailbox";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function EmailDetail({ params }: { params: { id: string } }) {
  const result = await getFullEmail(params.id);

  if (!result.success || !result.data) {
    notFound();
  }

  const { from, subject, date, htmlBody } = result.data;

  // Format time
  const formatDetailedTime = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleString([], { weekday: 'long', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      <Header title="Reading" />
      <main className="w-full min-h-screen pt-32 pb-20 px-6 md:pl-80 md:pr-10 relative z-10">
        <div className="max-w-3xl mx-auto">
          {/* Top Bar */}
          <div className="flex items-center justify-between mb-8 pb-6 border-b border-outline-variant/10">
            <Link href="/mailbox" className="flex items-center gap-2 text-outline hover:text-on-surface transition-colors">
              <span className="material-symbols-outlined">arrow_back</span>
              <span className="text-sm font-bold uppercase tracking-widest">Back to Mailbox</span>
            </Link>
            
            <div className="flex items-center gap-4">
              <button title="Archive" className="w-10 h-10 rounded-full flex items-center justify-center text-outline-variant hover:bg-surface-container-low hover:text-on-surface transition-all">
                <span className="material-symbols-outlined">archive</span>
              </button>
              <button title="Reply" className="w-10 h-10 rounded-full flex items-center justify-center text-outline-variant hover:bg-surface-container-low hover:text-on-surface transition-all">
                <span className="material-symbols-outlined">reply</span>
              </button>
            </div>
          </div>

          {/* Email Header */}
          <div className="mb-12">
            <h1 className="text-3xl md:text-4xl font-extrabold text-on-surface tracking-tight leading-tight mb-6">
              {subject}
            </h1>
            
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center text-secondary font-bold text-lg">
                  {from.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="font-bold text-on-surface">{from}</h3>
                  <p className="text-xs text-outline-variant mt-1">to me</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs font-medium text-outline">{formatDetailedTime(date)}</p>
              </div>
            </div>
          </div>

          {/* Email Body */}
          <div className="bg-white p-8 md:p-12 rounded-3xl border border-outline-variant/10 shadow-sm min-h-[500px] overflow-hidden">
            {/* Inject raw HTML securely. Note: In a real prod app, use DOMPurify to sanitize HTML */}
            <div 
              className="prose max-w-none text-zinc-900
                prose-p:text-zinc-900 prose-p:leading-relaxed 
                prose-a:text-secondary prose-a:font-bold prose-a:no-underline hover:prose-a:underline
                prose-img:rounded-xl prose-img:max-w-full
                prose-headings:font-bold prose-headings:tracking-tight
                prose-headings:text-zinc-900
                text-sm md:text-base"
              dangerouslySetInnerHTML={{ __html: htmlBody }}
            />
          </div>
        </div>
      </main>
    </>
  );
}
