
const MinimalTemplate = ({ data, accentColor }) => {
    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        const [year, month] = dateStr.split("-");
        return new Date(year, month - 1).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short"
        });
    };

    return (
        <div className="max-w-4xl mx-auto p-8 bg-white text-gray-900 font-light">

            {/* Header */}
            <header className="mb-10">
                <div className="flex items-end gap-3 mb-3">
                    <h1 className="text-4xl font-thin tracking-wide"
                        style={{ color: accentColor }}>
                        {data.personal_info?.full_name || "Your Name"}
                    </h1>
                    <p className="uppercase font-normal text-sm tracking-widest">
                        {data?.personal_info?.profession || ""}
                    </p>
                </div>
                <div className="flex flex-wrap gap-6 text-sm text-gray-600">
                    {data.personal_info?.email && <span>{data.personal_info.email}</span>}
                    {data.personal_info?.phone && <span>{data.personal_info.phone}</span>}
                    {data.personal_info?.location && <span>{data.personal_info.location}</span>}
                    {data.personal_info?.linkedin && (
                        <span className="break-all">{data.personal_info.linkedin}</span>
                    )}
                    {data.personal_info?.website && (
                        <span className="break-all">{data.personal_info.website}</span>
                    )}
                </div>
            </header>

            {/* Summary */}
            {data.summary && (
                <section className="mb-10">
                    <h2 className="text-sm uppercase tracking-widest mb-3 font-medium" style={{ color: accentColor }}>
                        Summary
                    </h2>
                    <p className=" text-gray-700 text-sm leading-relaxed">
                        {data.summary}
                    </p>
                </section>
            )}

            {/* Experience */}
            {data.experience && data.experience.length > 0 && (
                <section className="mb-10">
                    <h2 className="text-sm uppercase tracking-widest mb-3 font-medium" style={{ color: accentColor }}>
                        Experience
                    </h2>

                    <div className="space-y-6">
                        {data.experience.map((exp, index) => (
                            <div key={index}>
                                <div className="flex justify-between items-baseline mb-1">
                                    <h3 className="text-lg font-medium">{exp.position}</h3>
                                    <span className="text-sm text-gray-500">
                                        {formatDate(exp.start_date)} - {exp.is_current ? "Present" : formatDate(exp.end_date)}
                                    </span>
                                </div>
                                <p className="text-gray-600 mb-2">{exp.company}</p>
                                {exp.description && (
                                    <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                                        {exp.description}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Education */}
            {data.education && data.education.length > 0 && (
                <section className="mb-10">
                    <h2 className="text-sm uppercase tracking-widest mb-3 font-medium" style={{ color: accentColor }}>
                        Education
                    </h2>

                    <div className="space-y-4">
                        {data.education.map((edu, index) => (
                            <div key={index} className="flex justify-between items-start">

                                {/* LEFT */}
                                <div>
                                    <h3 className="font-medium">
                                        {edu.degree} {edu.field && `in ${edu.field}`}
                                    </h3>
                                    <p className="text-gray-600">{edu.institution}</p>
                                </div>

                                {/* RIGHT */}
                                <div className="text-sm text-gray-500 text-right whitespace-nowrap">
                                    <div>{formatDate(edu.graduation_date)}</div>
                                    {edu.gpa && <div className="text-xs">GPA: {edu.gpa}</div>}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Projects */}
            {data.project && data.project.length > 0 && (
                <section className="mb-10">
                    <h2 className="text-sm uppercase tracking-widest mb-3 font-medium" style={{ color: accentColor }}>
                        Projects
                    </h2>

                    <div className="space-y-6">
                        {data.project.map((proj, index) => (
                            <div key={index}>

                                {/* TOP ROW */}
                                <div className="flex justify-between items-start mb-1">

                                    {/* LEFT */}
                                    <div>
                                        <h3 className="text-lg font-medium">{proj.name}</h3>
                                    </div>

                                    {/* RIGHT (TYPE) */}
                                    {proj.type && (
                                        <div className="text-sm text-gray-500 whitespace-nowrap">
                                            {proj.type}
                                        </div>
                                    )}

                                </div>

                                {/* DESCRIPTION */}
                                {proj.description && (
                                    <p className="text-gray-700 text-sm mt-2">
                                        {proj.description}
                                    </p>
                                )}

                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Skills */}
            {data.skills && data.skills.length > 0 && (
                <section>
                    <h2 className="text-sm uppercase tracking-widest mb-6 font-medium" style={{ color: accentColor }}>
                        Skills
                    </h2>

                    <div className="text-gray-700 text-sm">
                        {data.skills.join(" • ")}
                    </div>
                </section>
            )}
        </div>
    );
}

export default MinimalTemplate;