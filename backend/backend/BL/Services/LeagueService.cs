using backend.BL.Exceptions;
using backend.BL.IRepositories;
using backend.BL.Models;
using backend.DA.Entities;
using System.Xml.Linq;

namespace backend.BL.Services
{
    public class LeagueService
    {
        private ILeagueRepository _leagueRepository;
        private IMatchRepository _matchRepository;
        private IClubRepository _clubRepository;
        private IUserRepository _userRepository;
        private ILogger<LeagueService> logger;
        public LeagueService(ILeagueRepository leagueRepository, IMatchRepository matchRepository, IClubRepository clubRepository, IUserRepository userRepository, ILogger<LeagueService> logger)
        {
            _leagueRepository = leagueRepository;
            _matchRepository = matchRepository;
            _clubRepository = clubRepository;
            _userRepository = userRepository;
            this.logger = logger;
        }
        public void InsertLeague(League league)
        {
            logger.LogInformation("created league started");
            _leagueRepository.create(league);
            logger.LogInformation("created league ended");
        }
        public void DeleteLeague(int id)
        {
            logger.LogInformation("started delete league");
            _leagueRepository.delete(id);
            logger.LogInformation("ended delete league");
        }
        public void ModifyLeague(int id, League league)
        {
            logger.LogInformation("started modify league");
            league.Id = id;
            _leagueRepository.update(league);
            logger.LogInformation("ended modify league");
        }
        public League GetLeague(int id)
        {
            logger.LogInformation("started read league");
            return _leagueRepository.readById(id);
        }
        public List<League> GetByUser(int userId)
        {
            return _leagueRepository.readByIdUser(userId);
        }
        public List<Club> GetClubsByIdLeague(int idleague)
        {
            return _clubRepository.readByIdLeague(idleague);
        }

        public List<MatchView> GetMatchesByIdLeague(int idLeague)
        {
            var tmp = _matchRepository.readByIdLeague(idLeague);
            List<MatchView> res = new List<MatchView>();
            foreach (var match in tmp)
            {
                var home = _clubRepository.readbyId(match.IdHome);
                var guest = _clubRepository.readbyId(match.IdGuest);
                res.Add(new MatchView { Id = match.Id, NameHome = home.Name, GoalHome = match.GoalHome, GoalGuest = match.GoalGuest, NameGuest = guest.Name });
            }
            return res;
        }
        public List<LeagueView> GetAll()
        {

           var tmp = _leagueRepository.readAll();
            List<LeagueView> res = new List<LeagueView>();
            foreach (var league in tmp)
            {
                var user = _userRepository.readById(league.IdUser);
                res.Add(new LeagueView { Id = league.Id, Name = league.Name, Name_User = user != null ? user.Name : "hieu" });
            }
            return res;

            //var tmp = _leagueRepository.readAll();
            //List<LeagueView> res = new List<LeagueView>();
            //foreach (var item in tmp)
            //{
            //    var user = _userRepository.readById(item.IdUser);
            //    res.Add(new LeagueView { Id = item.Id, Name = item.Name, Name_User = user.Name });
            //}
            //return res;
        }
    }
}
