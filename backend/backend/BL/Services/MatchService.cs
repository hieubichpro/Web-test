using backend.BL.Exceptions;
using backend.BL.IRepositories;
using backend.BL.Models;
using Microsoft.Extensions.Logging;

namespace backend.BL.Services
{
    public class MatchService
    {
        private IMatchRepository _matchRepository;
        private IClubRepository _clubRepository;
        private ILogger<MatchService> logger;
        public MatchService(IMatchRepository matchRepository, IClubRepository clubRepository, ILogger<MatchService> logger)
        {
            _matchRepository = matchRepository;
            _clubRepository = clubRepository;
            this.logger = logger;
        }
        public string GetNameClub(int idClub)
        {
            logger.LogInformation("get club started");
            Club c = _clubRepository.readbyId(idClub);
            logger.LogInformation("get club ended");
            return c.Name;
        }
        public List<Match> GetMatches(int idLeague)
        {
            logger.LogInformation("get matches started");
            var matches = _matchRepository.readByIdLeague(idLeague);
            logger.LogInformation("get matches ended");
            return matches;
        }
        public void EnterScore(int idMatch, Match match)
        {
            logger.LogInformation("enter score started");
            match.Id = idMatch;
            _matchRepository.update(match);
            logger.LogInformation("enter score ended");
        }
        public Match GetMatch(int idMatch)
        {
            logger.LogInformation("start get match by id");
            var match = _matchRepository.readByID(idMatch);
            logger.LogInformation("ended get match by id");
            return match;
        }
        public void InsertMatch(Match match)
        {
            logger.LogInformation("start insert match");
            _matchRepository.create(match);
            logger.LogInformation("ended insert match");
        }
        public void DeleteMatch(int idMatch)
        {
            logger.LogInformation("start delete match");
            _matchRepository.delete(idMatch);
            logger.LogInformation("ended delete match");
        }
        public List<Match> GetAll()
        {
            logger.LogInformation("start read matches");
            var matches = _matchRepository.readAll();
            logger.LogInformation("ended read matches");
            return matches;
        }
    }
}
