import { useLanguage } from "./LanguageContext.jsx";

export default function Team() {
  const { t } = useLanguage();
  const team = t.team;

  return (
    <section className="team-section" id="partenaires">
      <div className="wrap">
        <div className="section-head text-center reveal">
          <p className="eyebrow">{team.eyebrow}</p>
          <h2>{team.title}</h2>
          <p className="section-lead">{team.lead}</p>
        </div>

        <div className="team-members-grid">
          {team.members.map((member) => (
            <div className="team-member-card reveal" key={member.name}>
              <div className="team-member-avatar-wrap">
                {member.photo ? (
                  <img
                    className="team-member-avatar"
                    src={member.photo}
                    alt={member.name}
                    loading="lazy"
                  />
                ) : (
                  <div className="team-member-avatar-placeholder" aria-hidden="true">
                    {member.name
                      .split(" ")
                      .slice(0, 2)
                      .map((n) => n[0])
                      .join("")}
                  </div>
                )}
                <div className="team-member-avatar-ring" aria-hidden="true" />
              </div>
              <div className="team-member-info">
                <h3 className="team-member-name">{member.name}</h3>
                <p className="team-member-role">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
