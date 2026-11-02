import { useState, useMemo } from 'react';
import {
  Search,
  BookOpen,
  Calendar,
  ExternalLink,
  ShieldCheck,
  FileText,
  AlertCircle,
  Building2,
  CheckCircle2,
  Filter,
  Layers,
  HelpCircle,
  Bookmark,
  Share2,
  Cpu,
  Info
} from 'lucide-react';
import {
  TOPIC_RECORDS,
  MEDIA_LITERACY_GUIDE,
  RecordTopic,
  DocumentExcerpt,
  SourceLink
} from './data/records';

type ActiveTab = 'records' | 'timeline' | 'excerpts' | 'sources' | 'literacy';
type CategoryFilter = 'all' | 'clinton' | 'podesta' | 'bobulinski' | 'biden';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('records');
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);
  const [activeSubTab, setActiveSubTab] = useState<'findings' | 'context' | 'excerpts' | 'sources'>('findings');
  const [copiedLink, setCopiedLink] = useState(false);

  // Filter topics based on category and search query
  const filteredTopics = useMemo(() => {
    return TOPIC_RECORDS.filter((topic) => {
      const matchesCategory =
        selectedCategory === 'all' || topic.category === selectedCategory;

      if (!matchesCategory) return false;

      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase();
      const matchName = topic.subjectName.toLowerCase().includes(q);
      const matchOverview = topic.overview.toLowerCase().includes(q);
      const matchRole = topic.roleTitle.toLowerCase().includes(q);
      const matchFindings = topic.verifiedFindings.some((f) =>
        f.toLowerCase().includes(q)
      );
      const matchSources = topic.reliableSources.some(
        (s) => s.title.toLowerCase().includes(q) || s.publisher.toLowerCase().includes(q)
      );
      const matchExcerpts = topic.primaryExcerpts.some(
        (e) =>
          e.title.toLowerCase().includes(q) ||
          e.excerptText.toLowerCase().includes(q) ||
          e.sourceAuthority.toLowerCase().includes(q)
      );

      return (
        matchName ||
        matchOverview ||
        matchRole ||
        matchFindings ||
        matchSources ||
        matchExcerpts
      );
    });
  }, [selectedCategory, searchQuery]);

  // Unified timeline items
  const unifiedTimeline = useMemo(() => {
    const list: Array<{
      date: string;
      headline: string;
      summary: string;
      officialEntity: string;
      subjectName: string;
      category: string;
    }> = [];

    TOPIC_RECORDS.forEach((topic) => {
      if (selectedCategory === 'all' || topic.category === selectedCategory) {
        topic.timeline.forEach((item) => {
          if (
            !searchQuery.trim() ||
            item.headline.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.officialEntity.toLowerCase().includes(searchQuery.toLowerCase()) ||
            topic.subjectName.toLowerCase().includes(searchQuery.toLowerCase())
          ) {
            list.push({
              ...item,
              subjectName: topic.subjectName,
              category: topic.category
            });
          }
        });
      }
    });

    return list;
  }, [selectedCategory, searchQuery]);

  // All primary excerpts
  const allExcerpts = useMemo(() => {
    const list: Array<DocumentExcerpt & { subjectName: string; category: string }> = [];
    TOPIC_RECORDS.forEach((topic) => {
      if (selectedCategory === 'all' || topic.category === selectedCategory) {
        topic.primaryExcerpts.forEach((ex) => {
          if (
            !searchQuery.trim() ||
            ex.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            ex.excerptText.toLowerCase().includes(searchQuery.toLowerCase()) ||
            ex.sourceAuthority.toLowerCase().includes(searchQuery.toLowerCase()) ||
            topic.subjectName.toLowerCase().includes(searchQuery.toLowerCase())
          ) {
            list.push({
              ...ex,
              subjectName: topic.subjectName,
              category: topic.category
            });
          }
        });
      }
    });
    return list;
  }, [selectedCategory, searchQuery]);

  // All source links
  const allSources = useMemo(() => {
    const list: Array<SourceLink & { subjectName: string; category: string }> = [];
    TOPIC_RECORDS.forEach((topic) => {
      if (selectedCategory === 'all' || topic.category === selectedCategory) {
        topic.reliableSources.forEach((src) => {
          if (
            !searchQuery.trim() ||
            src.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            src.publisher.toLowerCase().includes(searchQuery.toLowerCase()) ||
            src.annotation.toLowerCase().includes(searchQuery.toLowerCase()) ||
            topic.subjectName.toLowerCase().includes(searchQuery.toLowerCase())
          ) {
            list.push({
              ...src,
              subjectName: topic.subjectName,
              category: topic.category
            });
          }
        });
      }
    });
    return list;
  }, [selectedCategory, searchQuery]);

  const activeTopic = TOPIC_RECORDS.find((t) => t.id === selectedTopicId) || filteredTopics[0];

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased selection:bg-slate-200">
      {/* Editorial Header */}
      <header className="border-b border-slate-200 bg-white sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between py-4 gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                  <ShieldCheck className="w-3.5 h-3.5" /> Documented Inquiries Portal
                </span>
                <span className="text-xs text-slate-500 font-medium">Public Records &amp; Verified Sources</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 mt-1">
                Sample Public Records &amp; Documented Inquiries
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                Investigative findings, official transcripts, and forensic validations regarding high-profile public records.
              </p>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleShare}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors"
                title="Copy link"
              >
                <Share2 className="w-3.5 h-3.5" />
                {copiedLink ? 'Link Copied!' : 'Share Archive'}
              </button>
              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search records, transcripts, sources..."
                  className="w-full pl-9 pr-4 py-1.5 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-md focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all placeholder:text-slate-400"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-2 text-xs text-slate-400 hover:text-slate-600"
                  >
                    ×
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Navigation Bar */}
          <nav className="flex space-x-1 sm:space-x-4 border-t border-slate-100 pt-2 overflow-x-auto text-xs sm:text-sm font-medium">
            <button
              onClick={() => setActiveTab('records')}
              className={`py-2 px-3 border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                activeTab === 'records'
                  ? 'border-blue-600 text-blue-700 font-semibold'
                  : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'
              }`}
            >
              <Building2 className="w-4 h-4" />
              Case Files &amp; Overview
            </button>
            <button
              onClick={() => setActiveTab('timeline')}
              className={`py-2 px-3 border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                activeTab === 'timeline'
                  ? 'border-blue-600 text-blue-700 font-semibold'
                  : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'
              }`}
            >
              <Calendar className="w-4 h-4" />
              Chronological Timeline
            </button>
            <button
              onClick={() => setActiveTab('excerpts')}
              className={`py-2 px-3 border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                activeTab === 'excerpts'
                  ? 'border-blue-600 text-blue-700 font-semibold'
                  : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'
              }`}
            >
              <FileText className="w-4 h-4" />
              Primary Excerpts &amp; Transcripts
            </button>
            <button
              onClick={() => setActiveTab('sources')}
              className={`py-2 px-3 border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                activeTab === 'sources'
                  ? 'border-blue-600 text-blue-700 font-semibold'
                  : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'
              }`}
            >
              <ExternalLink className="w-4 h-4" />
              Reliable Source Directory
            </button>
            <button
              onClick={() => setActiveTab('literacy')}
              className={`py-2 px-3 border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                activeTab === 'literacy'
                  ? 'border-blue-600 text-blue-700 font-semibold'
                  : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              Media Literacy &amp; Verification
            </button>
          </nav>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 bg-white p-3 rounded-lg border border-slate-200 shadow-2xs">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-500" />
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Filter by Subject:
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {[
              { id: 'all', label: 'All Records', count: TOPIC_RECORDS.length },
              { id: 'clinton', label: 'Hillary Clinton', count: 1 },
              { id: 'podesta', label: 'John Podesta', count: 1 },
              { id: 'bobulinski', label: 'Tony Bobulinski', count: 1 },
              { id: 'biden', label: 'Hunter Biden', count: 1 }
            ].map((btn) => (
              <button
                key={btn.id}
                onClick={() => setSelectedCategory(btn.id as CategoryFilter)}
                className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                  selectedCategory === btn.id
                    ? 'bg-blue-600 text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab 1: Detailed Case Files & Inquiries */}
        {activeTab === 'records' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Subject Selector Sidebar */}
            <div className="lg:col-span-4 space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500 px-1">
                Documented Case Files ({filteredTopics.length})
              </div>

              {filteredTopics.length === 0 ? (
                <div className="p-6 bg-white rounded-lg border border-slate-200 text-center text-slate-500 text-sm">
                  No records match your search query &quot;{searchQuery}&quot;.
                </div>
              ) : (
                filteredTopics.map((topic) => {
                  const isSelected = activeTopic?.id === topic.id;
                  return (
                    <div
                      key={topic.id}
                      onClick={() => {
                        setSelectedTopicId(topic.id);
                      }}
                      className={`cursor-pointer p-4 rounded-lg border transition-all text-left ${
                        isSelected
                          ? 'border-blue-500 bg-white shadow-sm ring-1 ring-blue-500'
                          : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h2 className="text-sm font-bold text-slate-900">
                            {topic.subjectName}
                          </h2>
                          <div className="text-xs text-slate-500 mt-0.5">
                            {topic.roleTitle}
                          </div>
                        </div>
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-600">
                          {topic.timeframe}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 mt-2 line-clamp-2">
                        {topic.overview}
                      </p>
                      <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                        <span>{topic.verifiedFindings.length} Verified Findings</span>
                        <span>{topic.reliableSources.length} Key Sources</span>
                      </div>
                    </div>
                  );
                })
              )}

              {/* Informational Box */}
              <div className="p-4 bg-slate-100 rounded-lg border border-slate-200 text-xs text-slate-600 space-y-2">
                <div className="flex items-center gap-1.5 font-semibold text-slate-800">
                  <Info className="w-4 h-4 text-blue-600" />
                  Standards of Evidence
                </div>
                <p>
                  This archive organizes primary records documented by federal agencies, congressional committee transcripts, and verified forensic inquiries. Speculative or ungrounded claims are separated and contextualized in the fact-checking section.
                </p>
              </div>
            </div>

            {/* Case File Details Panel */}
            {activeTopic && (
              <div className="lg:col-span-8 bg-white border border-slate-200 rounded-lg shadow-2xs overflow-hidden">
                {/* Topic Header */}
                <div className="p-6 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-white">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                      Case File Dossier
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Verified Public Record
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-2">
                    {activeTopic.subjectName}
                  </h2>
                  <div className="text-sm font-medium text-slate-600 mt-1">
                    {activeTopic.roleTitle} &bull; <span className="text-slate-500">{activeTopic.timeframe}</span>
                  </div>
                  <p className="text-sm text-slate-700 mt-3 leading-relaxed">
                    {activeTopic.overview}
                  </p>

                  {/* Sub Tabs */}
                  <div className="flex space-x-2 mt-6 border-b border-slate-200">
                    <button
                      onClick={() => setActiveSubTab('findings')}
                      className={`pb-2 px-3 text-xs sm:text-sm font-medium border-b-2 transition-colors ${
                        activeSubTab === 'findings'
                          ? 'border-blue-600 text-blue-700 font-semibold'
                          : 'border-transparent text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Key Verified Findings ({activeTopic.verifiedFindings.length})
                    </button>
                    <button
                      onClick={() => setActiveSubTab('context')}
                      className={`pb-2 px-3 text-xs sm:text-sm font-medium border-b-2 transition-colors ${
                        activeSubTab === 'context'
                          ? 'border-blue-600 text-blue-700 font-semibold'
                          : 'border-transparent text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Fact-Check &amp; Context ({activeTopic.debunkedClaims.length})
                    </button>
                    <button
                      onClick={() => setActiveSubTab('excerpts')}
                      className={`pb-2 px-3 text-xs sm:text-sm font-medium border-b-2 transition-colors ${
                        activeSubTab === 'excerpts'
                          ? 'border-blue-600 text-blue-700 font-semibold'
                          : 'border-transparent text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Primary Excerpts ({activeTopic.primaryExcerpts.length})
                    </button>
                    <button
                      onClick={() => setActiveSubTab('sources')}
                      className={`pb-2 px-3 text-xs sm:text-sm font-medium border-b-2 transition-colors ${
                        activeSubTab === 'sources'
                          ? 'border-blue-600 text-blue-700 font-semibold'
                          : 'border-transparent text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Reliable Sources ({activeTopic.reliableSources.length})
                    </button>
                  </div>
                </div>

                {/* Sub Tab Content */}
                <div className="p-6">
                  {/* Verified Findings */}
                  {activeSubTab === 'findings' && (
                    <div className="space-y-4">
                      <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                        Documented Conclusions &amp; Investigative Findings
                      </div>
                      <ul className="space-y-3">
                        {activeTopic.verifiedFindings.map((finding, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-3 p-3.5 bg-slate-50 rounded-lg border border-slate-200 text-sm text-slate-800"
                          >
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold">
                              {idx + 1}
                            </span>
                            <div className="leading-relaxed">{finding}</div>
                          </li>
                        ))}
                      </ul>

                      {/* Forensic Context Callout */}
                      <div className="mt-6 p-4 rounded-lg bg-blue-50/60 border border-blue-200">
                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-800 mb-1">
                          <Cpu className="w-4 h-4 text-blue-600" />
                          Forensic Methodology &amp; Custody
                        </div>
                        <p className="text-xs text-blue-900 leading-relaxed">
                          {activeTopic.forensicContext}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Fact-Check & Context */}
                  {activeSubTab === 'context' && (
                    <div className="space-y-4">
                      <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                        Separating Established Fact from Speculative Narratives
                      </div>

                      <div className="p-4 bg-amber-50 rounded-lg border border-amber-200 text-xs text-amber-900 leading-relaxed mb-4">
                        <div className="flex items-center gap-1.5 font-bold mb-1 text-amber-950">
                          <AlertCircle className="w-4 h-4 text-amber-600" />
                          Evaluating Unsubstantiated Claims
                        </div>
                        Public record releases often spark speculative interpretations online. Formal investigations require corroborating evidence, digital authenticity proofs, and cross-party verification rather than pattern-matching.
                      </div>

                      <div className="space-y-3">
                        {activeTopic.debunkedClaims.map((claim, idx) => (
                          <div
                            key={idx}
                            className="p-4 bg-white rounded-lg border border-slate-200 shadow-2xs space-y-2"
                          >
                            <div className="flex items-center gap-2 text-xs font-semibold text-rose-700">
                              <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                              Debunked / Unsubstantiated Claim Analysis
                            </div>
                            <p className="text-sm text-slate-700 leading-relaxed">
                              {claim}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Primary Excerpts */}
                  {activeSubTab === 'excerpts' && (
                    <div className="space-y-4">
                      <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                        Official Stenographic &amp; Evidentiary Excerpts
                      </div>
                      <div className="space-y-4">
                        {activeTopic.primaryExcerpts.map((ex) => (
                          <div
                            key={ex.id}
                            className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-2"
                          >
                            <div className="flex flex-wrap items-center justify-between gap-1">
                              <h3 className="text-sm font-bold text-slate-900">
                                {ex.title}
                              </h3>
                              <span className="text-xs font-medium text-slate-500">
                                {ex.date}
                              </span>
                            </div>
                            <div className="text-xs text-blue-700 font-medium">
                              Authority: {ex.sourceAuthority}
                            </div>
                            <blockquote className="my-2 pl-3 border-l-2 border-blue-400 text-xs sm:text-sm text-slate-800 italic bg-white p-2.5 rounded-r">
                              {ex.excerptText}
                            </blockquote>
                            <div className="text-xs text-slate-600">
                              <span className="font-semibold text-slate-700">Context:</span>{' '}
                              {ex.context}
                            </div>
                            <div className="text-[11px] text-slate-500">
                              <span className="font-semibold text-slate-600">Verification:</span>{' '}
                              {ex.verificationMethod}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Sources & Links */}
                  {activeSubTab === 'sources' && (
                    <div className="space-y-4">
                      <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                        Documented Sources &amp; Public Records
                      </div>
                      <div className="space-y-3">
                        {activeTopic.reliableSources.map((source, idx) => (
                          <a
                            key={idx}
                            href={source.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block p-4 rounded-lg border border-slate-200 bg-white hover:border-blue-400 hover:shadow-xs transition-all group"
                          >
                            <div className="flex items-start justify-between gap-3">
                              <div>
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                                    {source.publisher}
                                  </span>
                                  <span className="text-[11px] text-slate-500">
                                    {source.publishDate}
                                  </span>
                                </div>
                                <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors flex items-center gap-1.5">
                                  {source.title}
                                  <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600" />
                                </h3>
                                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                                  {source.annotation}
                                </p>
                              </div>
                            </div>
                            <div className="text-[11px] text-blue-600 mt-2 truncate font-mono">
                              {source.url}
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Unified Chronological Timeline */}
        {activeTab === 'timeline' && (
          <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-2xs">
            <div className="mb-6">
              <h2 className="text-lg font-bold text-slate-900">
                Chronological Record of Inquiries (2009 &ndash; 2024)
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                A sequential record of public disclosures, investigative reports, federal indictments, and congressional hearings.
              </p>
            </div>

            <div className="relative border-l-2 border-slate-200 ml-4 sm:ml-6 space-y-8 pl-6 sm:pl-8 py-2">
              {unifiedTimeline.map((item, index) => (
                <div key={index} className="relative group">
                  {/* Timeline Dot */}
                  <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-white border-4 border-blue-600 group-hover:scale-125 transition-transform" />

                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                      {item.date}
                    </span>
                    <span className="text-xs font-semibold text-slate-700">
                      {item.subjectName}
                    </span>
                    <span className="text-[11px] text-slate-400">&bull;</span>
                    <span className="text-xs text-slate-500 font-medium">
                      Authority: {item.officialEntity}
                    </span>
                  </div>

                  <h3 className="text-sm sm:text-base font-bold text-slate-900 mt-1">
                    {item.headline}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-3xl leading-relaxed">
                    {item.summary}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Primary Excerpts & Transcripts */}
        {activeTab === 'excerpts' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-2xs">
              <h2 className="text-lg font-bold text-slate-900">
                Primary Source Excerpts &amp; Official Transcripts
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Direct citations from public congressional transcripts, grand jury indictments, FBI public statements, and independent forensic reviews.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {allExcerpts.map((ex) => (
                <div
                  key={ex.id}
                  className="bg-white p-5 rounded-lg border border-slate-200 shadow-2xs flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                      <span className="font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                        {ex.subjectName}
                      </span>
                      <span>{ex.date}</span>
                    </div>
                    <h3 className="text-sm font-bold text-slate-900 mb-1">
                      {ex.title}
                    </h3>
                    <div className="text-xs text-slate-600 mb-3">
                      Authority: <span className="font-medium text-slate-800">{ex.sourceAuthority}</span>
                    </div>
                    <blockquote className="p-3 bg-slate-50 border-l-3 border-blue-500 text-xs sm:text-sm text-slate-800 italic rounded-r leading-relaxed whitespace-pre-line mb-3">
                      {ex.excerptText}
                    </blockquote>
                    <p className="text-xs text-slate-600 leading-relaxed mb-2">
                      <strong className="text-slate-700">Context:</strong> {ex.context}
                    </p>
                  </div>
                  <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-100 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Method: {ex.verificationMethod}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Reliable Source Directory */}
        {activeTab === 'sources' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-2xs">
              <h2 className="text-lg font-bold text-slate-900">
                Reliable Source Directory &amp; Reference Links
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Curated directory of primary government records, major news forensic investigations, and congressional transcripts requested for review.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {allSources.map((source, index) => (
                <a
                  key={index}
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-5 bg-white rounded-lg border border-slate-200 shadow-2xs hover:border-blue-500 hover:shadow-xs transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs mb-2">
                      <span className="font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                        {source.subjectName}
                      </span>
                      <span className="text-slate-500 font-medium">
                        {source.publishDate}
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors flex items-center justify-between gap-2">
                      <span>{source.title}</span>
                      <ExternalLink className="w-4 h-4 flex-shrink-0 text-slate-400 group-hover:text-blue-600" />
                    </h3>

                    <div className="text-xs font-semibold text-slate-600 mt-1">
                      Publisher: {source.publisher}
                    </div>

                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                      {source.annotation}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-[11px] font-mono text-blue-600 truncate max-w-[280px]">
                      {source.url}
                    </span>
                    <span className="text-[10px] uppercase font-bold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
                      {source.type}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Tab 5: Media Literacy & Verification */}
        {activeTab === 'literacy' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-2xs">
              <h2 className="text-lg font-bold text-slate-900">
                Media Literacy &amp; Forensic Verification Framework
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                How forensic cybersecurity specialists, federal courts, and investigative journalists evaluate leaked documents and separate fact from speculation.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {MEDIA_LITERACY_GUIDE.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white p-5 rounded-lg border border-slate-200 shadow-2xs space-y-3"
                >
                  <div className="flex items-center gap-2">
                    <span className="p-2 rounded-lg bg-blue-50 text-blue-600">
                      {item.category === 'authentication' && <Cpu className="w-5 h-5" />}
                      {item.category === 'chain-of-custody' && <Layers className="w-5 h-5" />}
                      {item.category === 'skepticism' && <HelpCircle className="w-5 h-5" />}
                      {item.category === 'context' && <Bookmark className="w-5 h-5" />}
                    </span>
                    <h3 className="text-base font-bold text-slate-900">
                      {item.title}
                    </h3>
                  </div>

                  <p className="text-xs font-semibold text-slate-600">
                    {item.summary}
                  </p>

                  <p className="text-xs text-slate-700 leading-relaxed">
                    {item.explanation}
                  </p>

                  <div className="p-3 bg-slate-50 rounded-md border border-slate-200 text-xs text-slate-800">
                    <span className="font-bold text-blue-800">Practical Verification Check:</span>{' '}
                    {item.practicalCheck}
                  </div>
                </div>
              ))}
            </div>

            {/* Educational Summary Card */}
            <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-6 rounded-lg shadow-sm space-y-3">
              <h3 className="text-base font-bold">Why Primary Sources Matter in Public Inquiries</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
                When major document caches or political controversies emerge, viral online discussions often conflate real records with unverified speculation. Objective researchers rely on:
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-200 pt-2">
                <li className="bg-slate-800/80 p-3 rounded border border-slate-700">
                  <span className="font-bold text-blue-400 block mb-1">1. Cryptographic Proof</span>
                  DKIM signatures and verified server hashes that confirm content was not modified.
                </li>
                <li className="bg-slate-800/80 p-3 rounded border border-slate-700">
                  <span className="font-bold text-blue-400 block mb-1">2. Chain of Custody</span>
                  Documenting every transfer of evidence to prevent tampering or insertion of forged files.
                </li>
                <li className="bg-slate-800/80 p-3 rounded border border-slate-700">
                  <span className="font-bold text-blue-400 block mb-1">3. Sworn Testimony</span>
                  Transcripts taken under oath (18 U.S.C. § 1001) with penalty of perjury and cross-examination.
                </li>
              </ul>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-12 border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-1">
          <p className="font-medium text-slate-700">
            Public Records &amp; Documented Inquiries Archive &bull; An Educational &amp; Research Tool
          </p>
          <p>
            Sources referenced include the U.S. House Committee on Oversight, U.S. Department of State FOIA Reading Room, DOJ Inspector General, The Washington Post, and CBS News.
          </p>
        </div>
      </footer>
    </div>
  );
}
