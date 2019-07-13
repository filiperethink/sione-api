// Filter Body
export function filteredBody(body, whitelist) {
  const items = {};

  Object.keys(body).forEach((key) => {
    if (whitelist.indexOf(key) >= 0) {
      items[key] = body[key];
    }
  });

  return items;
}

// Format Pelada Data

export const formatPeladaData = data => ({
  id: data._id,
  name: data.name,
  owner_id: data.owner_id,
  players: data.players,
  configs: {
    seasonSize: data.seasonSize,
    matchDuration: data.matchDuration,
    scoreLimit: data.scoreLimit,
    teamSize: data.teamSize,
  },
});
