export interface SourceLink {
  title: string;
  url: string;
  publisher: string;
  publishDate: string;
  type: 'investigative-report' | 'official-record' | 'forensic-analysis' | 'fact-check';
  annotation: string;
}

export interface DocumentExcerpt {
  id: string;
  title: string;
  date: string;
  sourceAuthority: string;
  excerptText: string;
  context: string;
  verificationMethod: string;
}

export interface TimelineEvent {
  date: string;
  headline: string;
  summary: string;
  officialEntity: string;
}

export interface RecordTopic {
  id: string;
  subjectName: string;
  roleTitle: string;
  timeframe: string;
  category: 'clinton' | 'podesta' | 'bobulinski' | 'biden';
  overview: string;
  verifiedFindings: string[];
  debunkedClaims: string[];
  forensicContext: string;
  timeline: TimelineEvent[];
  primaryExcerpts: DocumentExcerpt[];
  reliableSources: SourceLink[];
}

export const TOPIC_RECORDS: RecordTopic[] = [
  {
    id: 'hillary-clinton-records',
    subjectName: 'Hillary Rodham Clinton',
    roleTitle: 'Former U.S. Secretary of State',
    timeframe: '2009 – 2016 (Records Released 2015–2019)',
    category: 'clinton',
    overview:
      'Official reviews regarding the use of a private email server (hdr22@clintonemail.com) during tenure as Secretary of State, subsequent FOIA disclosures by the State Department, and inquiries by the FBI and State Department Office of the Inspector General.',
    verifiedFindings: [
      'The FBI and State Department Inspector General (OIG) determined that a private server system was used for official communications rather than a state.gov account.',
      'Approximately 30,000 work-related emails were turned over to the State Department in December 2014 and systematically released under FOIA through the State Department Virtual Reading Room.',
      'In July 2016, the FBI concluded that while personnel were "extremely careless" in handling classified information, there was no evidence of intentional mishandling or criminal intent warranting prosecution.',
      'A multi-year State Department review completed in October 2019 found violations of security procedures among some staff, but concluded there was "no persuasive evidence of systemic, deliberate mishandling of classified information."'
    ],
    debunkedClaims: [
      'Conspiracy theories alleging coded messages about illicit underground operations were extensively debunked by investigators, fact-checkers, and independent journalists; the emails discussed routine diplomatic itineraries, press clips, political strategy, and standard correspondence.',
      'Claims that foreign adversaries penetrated the server and deleted files directly were evaluated by forensic investigators without evidence of a successful direct breach, though the FBI noted security vulnerabilities existed.'
    ],
    forensicContext:
      'Archival review was performed by the FBI Operational Technology Division and State Department Records Management, utilizing server backups, workstation images, and Freedom of Information Act (FOIA) declassification processes.',
    timeline: [
      {
        date: 'March 2015',
        headline: 'First Public Reporting on Private Email Use',
        summary: 'News organizations report on the existence of the private server system used during 2009–2013.',
        officialEntity: 'The New York Times / U.S. State Department'
      },
      {
        date: 'May 2015 – Feb 2016',
        headline: 'State Department FOIA Releases',
        summary: 'Monthly rolling releases of tens of thousands of pages of redacted emails in the public FOIA reading room.',
        officialEntity: 'U.S. Department of State'
      },
      {
        date: 'July 5, 2016',
        headline: 'FBI Statement on Conclusion of Investigation',
        summary: 'FBI Director James Comey issues a public statement summarizing the findings of "Midyear Exam," recommending against prosecution.',
        officialEntity: 'Federal Bureau of Investigation (FBI)'
      },
      {
        date: 'October 2019',
        headline: 'State Department Internal Review Concluded',
        summary: 'Final administrative review finds no widespread deliberate violation of security rules across the department.',
        officialEntity: 'Office of Inspector General / State Dept Bureau of Diplomatic Security'
      }
    ],
    primaryExcerpts: [
      {
        id: 'clinton-ex-1',
        title: 'FBI Statement on Email Review (July 2016)',
        date: 'July 5, 2016',
        sourceAuthority: 'Federal Bureau of Investigation',
        excerptText:
          '"Although we did not find clear evidence that the Secretary or her colleagues intended to violate laws governing the handling of classified information, there is evidence that they were extremely careless in their handling of very sensitive, highly classified information... In looking back at our investigations into handling or removal of classified information, we cannot find a case that would support bringing criminal charges on these facts."',
        context: 'Official press conference delivered by FBI leadership following a year-long investigation.',
        verificationMethod: 'Public Federal Bureau statement and subsequent Department of Justice Inspector General review.'
      },
      {
        id: 'clinton-ex-2',
        title: 'State Department OIG Evaluation (Report ESP-16-03)',
        date: 'May 2016',
        sourceAuthority: 'Office of Inspector General, Department of State',
        excerptText:
          '"OIG found no evidence that the Secretary requested or obtained guidance or approval to conduct official business via a personal email account on her private server... Department policies required staff to preserve official records and utilize official secure networks for departmental business."',
        context: 'Statutory evaluation of records management and cybersecurity practices across multiple Secretaries of State.',
        verificationMethod: 'Congressional filing and official Inspector General report.'
      }
    ],
    reliableSources: [
      {
        title: 'State Department Virtual Reading Room: Clinton Email Disclosures',
        url: 'https://foia.state.gov/Search/Results.aspx?collection=Clinton_Email',
        publisher: 'U.S. Department of State',
        publishDate: 'Continuous FOIA Public Archive',
        type: 'official-record',
        annotation: 'Official repository containing thousands of declassified email records released under the Freedom of Information Act.'
      },
      {
        title: 'DOJ Inspector General Report on 2016 Election Inquiries',
        url: 'https://www.justice.gov/file/1071991/dl',
        publisher: 'U.S. Department of Justice OIG',
        publishDate: 'June 2018',
        type: 'official-record',
        annotation: 'Comprehensive 500-page oversight audit reviewing the procedures, findings, and evidence collection in the 2015-2016 inquiries.'
      },
      {
        title: 'State Department Completes Inquiry into Private Email System',
        url: 'https://www.nytimes.com/2019/10/18/us/politics/hillary-clinton-emails-state-department.html',
        publisher: 'The New York Times',
        publishDate: 'October 18, 2019',
        type: 'investigative-report',
        annotation: 'Reporting on the final administrative review finding no systemic intent to mishandle classified data.'
      }
    ]
  },
  {
    id: 'john-podesta-records',
    subjectName: 'John Podesta',
    roleTitle: '2016 Presidential Campaign Chairman',
    timeframe: 'March 2016 – November 2016',
    category: 'podesta',
    overview:
      'Records and emails obtained from a spear-phishing attack against John Podesta’s personal Gmail account in March 2016, subsequently published in October 2016. The incident was investigated by cybersecurity firms, the U.S. Intelligence Community, and Special Counsel Robert Mueller.',
    verifiedFindings: [
      'In March 2016, Podesta received a deceptive spear-phishing email masquerading as a Google security alert prompting a password change, resulting in unauthorized access to his account.',
      'U.S. intelligence agencies (ODNI, FBI, CIA, NSA) formally concluded in an unclassified assessment that Russian military intelligence (GRU Unit 26165) executed the intrusion.',
      'Special Counsel Robert Mueller filed a federal grand jury indictment in July 2018 detailing the exact digital infrastructure and timeline used to breach the email inbox.',
      'The leaked correspondence primarily contained internal campaign logistics, fundraising strategy, debate prep notes, speeches, and mundane staff banter.'
    ],
    debunkedClaims: [
      'Conspiracy narratives claiming email conversations about dinner menus, pizza, or casual restaurant plans contained secret codes were thoroughly investigated by law enforcement and fact-checkers; no secret codes or illicit networks were found, and the words referred literally to ordinary meals and catering.',
      'Speculation attributing the leak to an internal DNC staff whistleblower was rejected in forensic findings by both federal indictments and private security firms (CrowdStrike, Mandiant).'
    ],
    forensicContext:
      'Forensic analysis relied on Bitly link-shortening logs, command-and-control server IP tracking, phishing URL telemetry, and DKIM (DomainKeys Identified Mail) cryptographic header verification.',
    timeline: [
      {
        date: 'March 19, 2016',
        headline: 'Phishing Attack Received',
        summary: 'Targeted spear-phishing email sent to Podesta’s Gmail account using a malicious Bitly redirect link.',
        officialEntity: 'DOJ Mueller Indictment Details'
      },
      {
        date: 'October 7, 2016',
        headline: 'Public Release of Emails',
        summary: 'First batch of stolen emails published online; rolling releases continue through election day.',
        officialEntity: 'Wikileaks Public Distribution'
      },
      {
        date: 'January 6, 2017',
        headline: 'Intelligence Community Assessment (ICA)',
        summary: 'Office of the Director of National Intelligence releases assessment on Russian cyber operations.',
        officialEntity: 'ODNI, FBI, CIA, NSA'
      },
      {
        date: 'July 13, 2018',
        headline: 'Federal Indictment of GRU Officers',
        summary: 'Special Counsel Mueller charges 12 Russian military intelligence officials in connection with the hacking.',
        officialEntity: 'U.S. Department of Justice'
      }
    ],
    primaryExcerpts: [
      {
        id: 'podesta-ex-1',
        title: 'DOJ Indictment: United States v. Netyksho et al. (Case 1:18-cr-00215)',
        date: 'July 13, 2018',
        sourceAuthority: 'U.S. District Court for the District of Columbia',
        excerptText:
          '"On or about March 19, 2016, the Conspirators sent a spearphishing email to the chairman of the Hillary Clinton campaign... using a spoofed Google security notification that redirected the user to a server controlled by the Conspirators in Russia, gaining access to approximately 50,000 emails."',
        context: 'Formal federal indictment outlining forensic computer logs, cryptocurrency payments for server rentals, and digital evidence.',
        verificationMethod: 'Federal grand jury indictment supported by forensic digital logs and intelligence metadata.'
      },
      {
        id: 'podesta-ex-2',
        title: 'U.S. Intelligence Community Assessment on Cyber Intrusions',
        date: 'January 6, 2017',
        sourceAuthority: 'Office of the Director of National Intelligence',
        excerptText:
          '"We assess with high confidence that the GRU used the Guccifer 2.0 persona, DCLeaks.com, and WikiLeaks to release US victim data obtained in cyber operations publicly and relayed to media outlets."',
        context: 'Declassified joint assessment prepared by the CIA, FBI, and NSA.',
        verificationMethod: 'Joint inter-agency cryptographic and SIGINT forensic findings.'
      }
    ],
    reliableSources: [
      {
        title: 'The John Podesta Emails Released by WikiLeaks (Analysis & Context)',
        url: 'https://www.cbsnews.com/news/the-john-podesta-emails-released-by-wikileaks/',
        publisher: 'CBS News',
        publishDate: 'October 2016',
        type: 'investigative-report',
        annotation: 'Contemporary investigative breakdown examining the content, cybersecurity implications, and campaign impact of the release.'
      },
      {
        title: 'Indictment of 12 Russian Intelligence Officers (Special Counsel Mueller)',
        url: 'https://www.justice.gov/file/1080281/dl',
        publisher: 'U.S. Department of Justice',
        publishDate: 'July 13, 2018',
        type: 'official-record',
        annotation: 'Primary court filing documenting the exact technical mechanisms and spear-phishing infrastructure used to breach the account.'
      },
      {
        title: 'The Anatomy of the Podesta Email Phishing Scheme',
        url: 'https://www.theatlantic.com/technology/archive/2018/07/russian-hackers-spearphishing/565158/',
        publisher: 'The Atlantic',
        publishDate: 'July 2018',
        type: 'forensic-analysis',
        annotation: 'In-depth forensic retrospective explaining digital certificates, Bitly links, and how user credentials were intercepted.'
      }
    ]
  },
  {
    id: 'tony-bobulinski-records',
    subjectName: 'Tony Bobulinski',
    roleTitle: 'Former Business Associate & Navy Veteran',
    timeframe: 'October 2020 – March 2024 (Congressional Testimony)',
    category: 'bobulinski',
    overview:
      'Transcribed interviews, records submissions, and public congressional testimony by Tony Bobulinski before the House Committee on Oversight and Accountability regarding his 2017 proposed joint venture (SinoHawk Holdings) with CEFC China Energy and members of the Biden family.',
    verifiedFindings: [
      'Bobulinski was introduced in spring 2017 to Hunter Biden and James Biden to serve as CEO of a proposed joint business venture known as SinoHawk Holdings.',
      'SinoHawk Holdings was intended to partner with Chinese energy conglomerate CEFC; however, the venture was dissolved before executing commercial transactions or securing operating capital.',
      'Bobulinski provided WhatsApp messaging logs, email exchanges, and corporate governance draft agreements to congressional committees and the FBI.',
      'In February and March 2024, Bobulinski participated in a transcribed deposition and a public hearing before the House Committee on Oversight and Accountability, where lawmakers examined his claims regarding executive knowledge of family ventures.'
    ],
    debunkedClaims: [
      'Unsubstantiated claims linking Bobulinski to clandestine chemical laboratories in Ukraine or covert biochemical installations have zero basis in the congressional record or in investigative findings.',
      'Partisan disputes over whether Joe Biden had direct financial involvement in SinoHawk were subject to sworn depositions; other venture participants (such as James Gilliar and Rob Walker) testified that Joe Biden never held equity or received disbursements from the planned venture.'
    ],
    forensicContext:
      'Records include physical mobile device archives submitted to the FBI in 2020, electronic WhatsApp export archives, and official stenographic transcript records maintained by the House Committee on Oversight.',
    timeline: [
      {
        date: 'October 22, 2020',
        headline: 'Public Press Statement in Nashville',
        summary: 'Bobulinski holds a press briefing prior to the presidential debate, providing electronic records to media and law enforcement.',
        officialEntity: 'Public Announcement'
      },
      {
        date: 'October 23, 2020',
        headline: 'Voluntary FBI Interview',
        summary: 'Bobulinski meets with FBI field agents in Washington, D.C., submitting forensic clones of three mobile devices.',
        officialEntity: 'Federal Bureau of Investigation'
      },
      {
        date: 'February 13, 2024',
        headline: 'Transcribed Congressional Interview',
        summary: 'Undergoes an extensive eight-hour transcribed deposition with House Oversight Committee majority and minority staff.',
        officialEntity: 'House Committee on Oversight and Accountability'
      },
      {
        date: 'March 20, 2024',
        headline: 'Public Hearing Testimony',
        summary: 'Testifies under oath alongside other witnesses before the full House Oversight Committee.',
        officialEntity: 'U.S. House of Representatives'
      }
    ],
    primaryExcerpts: [
      {
        id: 'bobulinski-ex-1',
        title: 'Transcribed Interview with House Committee on Oversight (Feb 2024)',
        date: 'February 13, 2024',
        sourceAuthority: 'House Committee on Oversight and Accountability',
        excerptText:
          '"Q: What was the primary purpose of SinoHawk Holdings when you were engaged as CEO?\nMr. Bobulinski: The purpose was to identify infrastructure, energy, and technology projects around the world to partner with CEFC China Energy as a global investment vehicle... By late 2017, the operating agreement had not been funded and the venture did not move forward."',
        context: 'Official committee deposition inquiring into corporate governance documents and communications.',
        verificationMethod: 'Congressional stenographic transcript published by the House Committee.'
      },
      {
        id: 'bobulinski-ex-2',
        title: 'House Oversight Majority Memo on Witness Depositions',
        date: 'February 2024',
        sourceAuthority: 'House Committee on Oversight and Accountability',
        excerptText:
          '"During his transcribed interview, Mr. Bobulinski testified regarding his May 2017 meetings in Los Angeles and detailed his view of corporate communications and drafts exchanged between SinoHawk partners and foreign counterparties."',
        context: 'Congressional committee oversight memo documenting evidence submissions and witness statements.',
        verificationMethod: 'Official House Committee publications and public releases.'
      }
    ],
    reliableSources: [
      {
        title: 'Key Excerpts from Tony Bobulinski’s Transcribed Interview',
        url: 'https://oversight.house.gov/blog/key-excerpts-from-tony-bobulinskis-transcribed-interview/',
        publisher: 'House Committee on Oversight and Accountability',
        publishDate: 'February 2024',
        type: 'official-record',
        annotation: 'Official congressional publication providing direct transcript excerpts and document references from the deposition.'
      },
      {
        title: 'Full Transcribed Interview Record: Tony Bobulinski (PDF)',
        url: 'https://oversight.house.gov/wp-content/uploads/2024/02/Bobulinski-Transcribed-Interview-Redacted.pdf',
        publisher: 'U.S. House of Representatives',
        publishDate: 'February 13, 2024',
        type: 'official-record',
        annotation: 'Complete, unedited, redacted congressional deposition transcript spanning hundreds of pages of question-and-answer testimony.'
      },
      {
        title: 'House Oversight Hearing Witness Statements and Records Review',
        url: 'https://www.c-span.org/video/?534346-1/house-oversight-hearing-biden-family-business-dealings',
        publisher: 'C-SPAN',
        publishDate: 'March 20, 2024',
        type: 'official-record',
        annotation: 'Full televised recording of the public hearing testimony, questioning, and document exhibits.'
      }
    ]
  },
  {
    id: 'hunter-biden-records',
    subjectName: 'Hunter Biden',
    roleTitle: 'Attorney, Businessman & Author',
    timeframe: 'April 2019 – Present (Forensic Validations 2021–2024)',
    category: 'biden',
    overview:
      'Records originating from a MacBook Pro left at a Wilmington, Delaware computer repair shop in April 2019. The drive contents underwent technical forensic evaluations by independent cybersecurity firms commissioned by major news organizations, alongside official Department of Justice filings in federal court.',
    verifiedFindings: [
      'In March 2022, independent cybersecurity experts commissioned by The Washington Post authenticated approximately 22,000 emails using cryptographic DKIM (DomainKeys Identified Mail) signatures that matched Google and third-party server certificates.',
      'In November 2022, CBS News commissioned a top digital forensics firm (Computer Forensics Services) which authenticated the user data cache directly, concluding the core files were authentic and had not been fabricated.',
      'Forensic analysts also identified that data had been accessed, copied, and handled by multiple external parties over the intervening years, creating messy file structures and preventing authentication of certain undocumented folders.',
      'Department of Justice Special Counsel David Weiss admitted portions of the data cache into evidence in federal court proceedings (2024 federal firearms and tax trials), confirming authenticity of specific personal messages and financial records.'
    ],
    debunkedClaims: [
      'Claims connecting the laptop contents to international human trafficking or covert child exploitation networks (frequently conflated with Pizzagate memes) are completely unfounded and have no factual basis in any forensic examination, police report, or court proceeding.',
      'Early theories that the entire laptop hardware was a fictional plant or an orchestrated foreign disinformation fabrication were disproven by physical shop receipts, witness testimony, and DKIM cryptographic validation of tens of thousands of emails.'
    ],
    forensicContext:
      'Authentication relied primarily on cryptographic DKIM signatures, EXIF timestamp metadata consistency, Apple File System (APFS) volume logs, and comparative analysis against third-party recipients.',
    timeline: [
      {
        date: 'April 2019',
        headline: 'Laptop Left at Repair Facility',
        summary: 'A MacBook Pro is dropped off at a Wilmington, Delaware computer repair shop and left uncollected.',
        officialEntity: 'Shop Service Records'
      },
      {
        date: 'December 2019',
        headline: 'FBI Subpoena and Custody',
        summary: 'The FBI issues a federal grand jury subpoena to take custody of the physical hard drive.',
        officialEntity: 'Federal Grand Jury Subpoena'
      },
      {
        date: 'October 2020',
        headline: 'First Press Reporting and Controversy',
        summary: 'The New York Post publishes articles based on copies of drive files provided by Rudolph Giuliani.',
        officialEntity: 'Media Publication'
      },
      {
        date: 'March 2022',
        headline: 'Washington Post Forensic Authentication',
        summary: 'Two independent digital forensics experts authenticate thousands of emails via cryptographic DKIM analysis.',
        officialEntity: 'The Washington Post Investigation'
      },
      {
        date: 'June 2024',
        headline: 'DOJ Federal Court Evidence Submission',
        summary: 'Special Counsel prosecutors introduce corroborated records into evidence during federal court proceedings.',
        officialEntity: 'U.S. District Court (Special Counsel David Weiss)'
      }
    ],
    primaryExcerpts: [
      {
        id: 'biden-ex-1',
        title: 'The Washington Post Technical Forensic Findings (March 2022)',
        date: 'March 30, 2022',
        sourceAuthority: 'The Washington Post & Independent Forensic Labs',
        excerptText:
          '"Two security experts who analyzed 217 gigabytes of data provided to The Post concluded that nearly 22,000 emails were authentic and bore valid cryptographic signatures... However, the vast majority of the data could not be verified because the folders showed evidence of having been repeatedly copied, reorganized, and accessed by external individuals after the initial date."',
        context: 'Comprehensive technical review analyzing DKIM signatures and drive integrity.',
        verificationMethod: 'Cryptographic DKIM key verification verified with Google, Apple, and recipient mail servers.'
      },
      {
        id: 'biden-ex-2',
        title: 'DOJ Special Counsel Evidentiary Filing in U.S. v. Robert Hunter Biden',
        date: 'January 2024',
        sourceAuthority: 'Office of Special Counsel David Weiss / U.S. Department of Justice',
        excerptText:
          '"In December 2019, pursuant to a court-authorized grand jury subpoena, the FBI retrieved the defendant’s Apple MacBook from the repair shop... The government confirmed that the data obtained from the computer matched data obtained from the defendant’s Apple iCloud backup via separate search warrant."',
        context: 'Pre-trial evidentiary motions confirming chain of custody and corroboration.',
        verificationMethod: 'Judicial search warrant execution and iCloud digital cross-verification.'
      }
    ],
    reliableSources: [
      {
        title: 'The Forgotten and Ignored Context of the Emergence of the Hunter Biden Laptop Story',
        url: 'https://www.washingtonpost.com/politics/2022/03/18/forgotten-and-ignored-context-emergence-hunter-biden-laptop-story/',
        publisher: 'The Washington Post',
        publishDate: 'March 18, 2022',
        type: 'investigative-report',
        annotation: 'In-depth investigative report detailing the chronological emergence, journalistic verification standards, and public reaction.'
      },
      {
        title: 'Here’s how The Post analyzed Hunter Biden’s laptop records',
        url: 'https://www.washingtonpost.com/technology/2022/03/30/hunter-biden-laptop-read-the-emails-analyze-data/',
        publisher: 'The Washington Post',
        publishDate: 'March 30, 2022',
        type: 'forensic-analysis',
        annotation: 'Technical breakdown of cryptographic DKIM validation, file headers, and third-party forensic lab methodologies.'
      },
      {
        title: 'CBS News independent forensic evaluation of Hunter Biden laptop data',
        url: 'https://www.cbsnews.com/news/hunter-biden-laptop-data-analysis/',
        publisher: 'CBS News',
        publishDate: 'November 21, 2022',
        type: 'forensic-analysis',
        annotation: 'Investigation conducted by Computer Forensics Services confirming data integrity and verifying file provenance.'
      }
    ]
  }
];

export interface LiteracyPrinciple {
  title: string;
  category: 'authentication' | 'context' | 'skepticism' | 'chain-of-custody';
  summary: string;
  explanation: string;
  practicalCheck: string;
}

export const MEDIA_LITERACY_GUIDE: LiteracyPrinciple[] = [
  {
    title: 'DKIM Cryptographic Signatures',
    category: 'authentication',
    summary: 'How digital signatures guarantee an email was not altered after transmission.',
    explanation:
      'DomainKeys Identified Mail (DKIM) attaches a cryptographic signature to email headers matching the sender’s domain private key. If an email text or timestamp is altered even by one character, the cryptographic signature fails mathematical verification.',
    practicalCheck: 'Look for independent forensic reports that verify cryptographic hashes and public keys against historical DNS records.'
  },
  {
    title: 'Chain of Custody & Metadata Integrity',
    category: 'chain-of-custody',
    summary: 'Why the path a physical drive or document takes matters for legal and journalistic standards.',
    explanation:
      'When hardware or files pass through non-law-enforcement hands, files can be modified, reordered, or interspersed with unverified material. Professional forensics differentiates original file system timestamps (created dates) from modification dates.',
    practicalCheck: 'Check whether forensic teams had direct bit-stream images from original hardware or secondary third-party duplicates.'
  },
  {
    title: 'Distinguishing Fact from Pattern-Seeking Speculation',
    category: 'skepticism',
    summary: 'The difference between literal reading and conspiratorial code-reading.',
    explanation:
      'Conspiracy theories often rely on the premise that ordinary words are secret codes for clandestine networks. Objective investigation requires demonstrable evidence (corroborating physical records, witnesses, victim statements, bank transfers) rather than subjective associative interpretation.',
    practicalCheck: 'Ask: Does the claim rely on verified official documents, or does it require decoding "hidden symbols" that lack independent evidentiary corroboration?'
  },
  {
    title: 'Institutional Oversight vs. Anonymous Rumors',
    category: 'context',
    summary: 'Relying on sworn testimony, inspector general audits, and cross-party congressional records.',
    explanation:
      'Formal records such as transcribed congressional interviews and DOJ Inspector General reports are subject to federal perjury statutes (18 U.S.C. § 1001), bipartisan cross-examination, and archival record preservation.',
    practicalCheck: 'Cross-reference unverified viral claims with official transcripts published directly on government repositories (.gov domains) and major news forensic investigations.'
  }
];
