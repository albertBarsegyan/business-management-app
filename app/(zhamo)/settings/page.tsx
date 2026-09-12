import {
  getTeamMemberWorkingHours,
  listTeamMembers,
} from "@/entities/team-member/api/list-team-members";
import { getLocations } from "@/entities/location/api/get-locations";
import { getVenue } from "@/entities/venue/api/get-venue";
import { SettingsScreen } from "@/widgets/settings";

export default async function SettingsPage() {
  const [venue, locations, teamMembers] = await Promise.all([
    getVenue(),
    getLocations(),
    listTeamMembers(),
  ]);

  const teamWorkingHours = await Promise.all(
    teamMembers.map(async (member) => ({
      member,
      hours: await getTeamMemberWorkingHours(member.id),
    })),
  );

  const primaryLocation =
    locations.find((location) => location.isPrimary) ?? locations[0] ?? null;

  return (
    <SettingsScreen
      venue={venue}
      primaryLocation={primaryLocation}
      teamWorkingHours={teamWorkingHours}
    />
  );
}
