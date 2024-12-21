using AutoMapper;
using backend.BL.Exceptions;
using backend.BL.IRepositories;
using backend.BL.Models;
using backend.DA.dbContext;
using backend.DA.Entities;

namespace backend.DA.Repositories
{
    public class LeagueRepository : ILeagueRepository
    {
        private dbContextFactory _dbContextFactory;
        private ILogger<LeagueRepository> logger;
        private IMapper _mapper;
        public LeagueRepository(dbContextFactory dbContextFactory, ILogger<LeagueRepository> logger, IMapper mapper)
        {
            _dbContextFactory = dbContextFactory;
            this.logger = logger;
            _mapper = mapper;
        }
        public League readbyName(string name)
        {
            logger.LogInformation("started read league by name");
            using var db_context = _dbContextFactory.get_db_context();
            var league = db_context.leagues.FirstOrDefault(l => l.Name == name);
            if (league == null)
            {
                logger.LogError("league doesnt exists");
                throw new LeagueNotFoundException();
            }
            logger.LogInformation("ended read league by name");
            return _mapper.Map<LeagueDb, League>(league);
        }
        public void create(League league)
        {
            logger.LogInformation("started create league");
            //try
            //{
            using var db_context = _dbContextFactory.get_db_context();
            if (db_context.leagues.FirstOrDefault(l => l.Name == league.Name) != null)
            {
                logger.LogError("league exists");
                throw new LeagueExistException();
            }
            if (db_context.leagues.Count() > 0)
            {
                league.Id = db_context.leagues.Select(u => u.Id).Max() + 1;
            }
            else
            {
                league.Id = 1;
            }
            db_context.leagues.Add(_mapper.Map<League, LeagueDb>(league));
            db_context.SaveChanges();
            logger.LogInformation("ended create league");
            //}
            //catch (Exception ex)
            //{
            //    logger.LogError("create league failed");
            //    throw new Exception("failed while create league");
            //}
        }
        public void delete(int id)
        {
            logger.LogInformation("started delete league");
            //try
            //{
            using var db_context = _dbContextFactory.get_db_context();
            var league = db_context.leagues.FirstOrDefault(l => l.Id == id);
            if (league == null)
            {
                logger.LogError("League doesnt exists");
                throw new LeagueNotFoundException();
            }
            db_context.leagues.Remove(league);
            db_context.SaveChanges();
            logger.LogInformation("ended delete league");
            //}
            //catch (Exception ex)
            //{
            //    logger.LogError("delete league failed");
            //    throw new Exception("failed while delete league");
            //}
        }

        public League readById(int id)
        {
            logger.LogInformation("started read league by id");
            using var db_context = _dbContextFactory.get_db_context();
            var league = db_context.leagues.FirstOrDefault(l => l.Id == id);
            if (league == null)
            {
                logger.LogError("league doesnt exitst");
                throw new LeagueNotFoundException();
            }
            logger.LogInformation("ended read league by id");
            return _mapper.Map<LeagueDb, League>(league);
        }
        public List<League> readAll()
        {
            logger.LogInformation("started read all league");
            using var db_context = _dbContextFactory.get_db_context();
            logger.LogInformation("ended read all league");
            return db_context.leagues.Select(l => _mapper.Map<LeagueDb, League>(l)).ToList();
        }

        public void update(League l)
        {
            logger.LogInformation("started update league");
            //try
            //{
            using var db_context = _dbContextFactory.get_db_context();
            var league = db_context.leagues.FirstOrDefault(L => L.Id == l.Id);
            if (league == null)
            {
                logger.LogError("league doesnt exists");
                throw new LeagueNotFoundException();
            }
            league.Name = l.Name;
            //league.IdUser = l.IdUser;
            db_context.SaveChanges();
            logger.LogInformation("ended update league");
        }

        public List<League> readByIdUser(int id)
        {
            logger.LogInformation("started read league by id_user");
            using var db_context = _dbContextFactory.get_db_context();
            var leaguestmp = db_context.leagues.Where(l => l.IdUser == id).ToList();
            logger.LogInformation("ended read league by id_user");
            // Map<source, des>
            return leaguestmp.Select(l => _mapper.Map<LeagueDb, League>(l)).ToList();
        }
    }
}
