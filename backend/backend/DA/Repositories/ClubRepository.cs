using AutoMapper;
using backend.BL.Exceptions;
using backend.BL.IRepositories;
using backend.BL.Models;
using backend.DA.dbContext;
using backend.DA.Entities;
using System.Xml.Linq;

namespace backend.DA.Repositories
{
    public class ClubRepository : IClubRepository
    {
        private dbContextFactory _dbContextFactory;
        private ILogger<ClubRepository> logger;
        private IMapper _mapper;
        public ClubRepository(dbContextFactory dbContextFactory, ILogger<ClubRepository> logger, IMapper mapper)
        {
            _dbContextFactory = dbContextFactory;
            this.logger = logger;
            _mapper = mapper;
        }
        public Club readbyName(string name)
        {
            logger.LogInformation("started read club by name");
            using var db_context = _dbContextFactory.get_db_context();
            var club = db_context.clubs.FirstOrDefault(c => c.Name == name);
            if (club == null)
            {
                logger.LogError("club doesnt exists");
                throw new ClubNotFoundException();
            }
            logger.LogInformation("ended read club by name");
            return _mapper.Map<ClubDb, Club>(club);
        }

        public Club readbyId(int id)
        {
            logger.LogInformation("started read club by id");
            using var db_context = _dbContextFactory.get_db_context();
            var club = db_context.clubs.FirstOrDefault(c => c.Id == id);
            if (club == null)
            {
                logger.LogError("club doesnt exists");
                throw new ClubNotFoundException();
            }
            logger.LogInformation("ended read club by id");
            return _mapper.Map<ClubDb, Club>(club);
        }
        public void create(Club club)
        {
            logger.LogInformation("started create club");
            using var db_context = _dbContextFactory.get_db_context();
            if (db_context.clubs.FirstOrDefault(c => c.Name == club.Name) != null)
            {
                logger.LogError("club exists");
                throw new ClubExistException();
            }
            var c = _mapper.Map<Club, ClubDb>(club);
            if (db_context.clubs.Count() > 0)
            {
                c.Id = db_context.clubs.Select(u => u.Id).Max() + 1;
            }
            else
            {
                c.Id = 1;
            }
            db_context.clubs.Add(c);
            db_context.SaveChanges();
            logger.LogInformation("ended create club");
        }
        public List<Club> readAll()
        {
            logger.LogInformation("started read club by role");
            using var db_context = _dbContextFactory.get_db_context();
            logger.LogInformation("ended read club by role");
            return db_context.clubs.Select(c => _mapper.Map<ClubDb, Club>(c)).ToList();
        }

        public void update(Club club)
        {
            logger.LogInformation("started update club");
            //try
            //{
            using var db_context = _dbContextFactory.get_db_context();
            var c = db_context.clubs.FirstOrDefault(c => c.Id == club.Id);
            if (c == null)
            {
                logger.LogError("error");
                throw new ClubNotFoundException();
            }
            c.Name = club.Name;
            c.IdLeague = club.IdLeague;
            db_context.SaveChanges();
            logger.LogInformation("ended update club");
            //}
            //catch (Exception ex)
            //{
            //    logger.LogError("update club failed");
            //    throw new Exception("failed while update club");
            //}
        }

        public void delete(int id)
        {
            logger.LogInformation("started delete club");
            //try
            //{
            using var db_context = _dbContextFactory.get_db_context();
            var club = db_context.clubs.FirstOrDefault(c => c.Id == id);
            if (club == null)
            {
                logger.LogError("error");
                throw new ClubNotFoundException();
            }
            db_context.clubs.Remove(club);
            db_context.SaveChanges();
            logger.LogInformation("ended delete club");
            //}
            //catch (Exception ex)
            //{
            //    logger.LogError("delete club failed");
            //    throw new Exception("failed while delete club");
            //}
        }

        public List<Club> readByIdLeague(int idleague)
        {
            logger.LogInformation("started read clubs by idleague");
            using var db_context = _dbContextFactory.get_db_context();
            logger.LogInformation("ended read clubs by idleague");
            return db_context.clubs.Where(c => c.IdLeague == idleague).Select(c => _mapper.Map<ClubDb, Club>(c)).ToList();
        }

        public List<Club> readClubBy(string start_with)
        {
            //logger.LogInformation("started read clubs by idleague");
            using var db_context = _dbContextFactory.get_db_context();
            //logger.LogInformation("ended read clubs by idleague");
            return db_context.clubs.Where(c => start_with != null ? c.Name.StartsWith(start_with) : true).Select(c => _mapper.Map<ClubDb, Club>(c)).ToList();
        }

    }
}
