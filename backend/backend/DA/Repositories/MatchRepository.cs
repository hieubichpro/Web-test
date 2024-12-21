using AutoMapper;
using backend.BL.Exceptions;
using backend.BL.IRepositories;
using backend.BL.Models;
using backend.DA.dbContext;
using backend.DA.Entities;
using Microsoft.EntityFrameworkCore;

namespace backend.DA.Repositories
{
    public class MatchRepository : IMatchRepository
    {
        private dbContextFactory _dbContextFactory;
        private ILogger<MatchRepository> logger;
        private IMapper _mapper;
        public MatchRepository(dbContextFactory dbContextFactory, ILogger<MatchRepository> logger, IMapper mapper)
        {
            _dbContextFactory = dbContextFactory;
            this.logger = logger;
            _mapper = mapper;
        }
        public void create(Match m)
        {
            logger.LogInformation("started create match");
            var match = _mapper.Map<Match, MatchDb>(m);
            //try
            //{
            using var db_context = _dbContextFactory.get_db_context();
            if (db_context.matches.Count() > 0)
            {
                match.Id = db_context.matches.Select(u => u.Id).Max() + 1;
            }
            else
            {
                match.Id = 1;
            }
            db_context.matches.Add(match);
            db_context.SaveChanges();
            logger.LogInformation("ended create match");
            //}
            //catch (Exception ex)
            //{
            //    logger.LogError("create match failed");
            //    throw new Exception("failed while create match");
            //}
        }
        public void update(Match m)
        {
            logger.LogInformation("started update match");
            //try
            //{
            using var db_context = _dbContextFactory.get_db_context();
            var match = db_context.matches.FirstOrDefault(M => M.Id == m.Id);
            if (match == null)
            {
                logger.LogError("match not found");
                throw new MatchNotFoundException();
            }
            match.GoalHome = m.GoalHome;
            match.GoalGuest = m.GoalGuest;
            //match.IdLeague = m.IdLeague;
            //match.IdHome = m.IdHome;
            //match.IdGuest = m.IdGuest;
            db_context.SaveChanges();
            logger.LogInformation("ended update match");
            //}
            //catch (Exception ex)
            //{
            //    logger.LogError("update match failed");
            //    throw new Exception("failed while update match");
            //}
        }

        public List<Match> readByIdLeague(int id_league)
        {
            logger.LogInformation("start read all match");
            using var db_context = _dbContextFactory.get_db_context();
            var matches = db_context.matches.Where(m => m.IdLeague == id_league).ToList();
            logger.LogInformation("end read all match");
            return matches.Select(m => _mapper.Map<MatchDb, Match>(m)).ToList();
        }

        public Match readByID(int id)
        {
            logger.LogInformation("started read match by id");
            using var db_context = _dbContextFactory.get_db_context();
            var match = db_context.matches.FirstOrDefault(u => u.Id == id);
            if (match == null)
            {
                throw new MatchNotFoundException();
            }
            logger.LogInformation("ended read match by id");
            return _mapper.Map<MatchDb, Match>(match);
        }

        public List<Match> readAll()
        {
            logger.LogInformation("started read all match");
            using var db_context = _dbContextFactory.get_db_context();
            logger.LogInformation("ended read all match");
            return db_context.matches.Select(m => _mapper.Map<MatchDb, Match>(m)).ToList();
        }
        public void delete(int id)
        {
            logger.LogInformation("start delete match");
            using var db_context = _dbContextFactory.get_db_context();
            var match = db_context.matches.FirstOrDefault(u => u.Id == id);
            if (match == null)
            {
                throw new MatchNotFoundException();
            }
            db_context.matches.Remove(match);
            db_context.SaveChanges();
            logger.LogInformation("ended delete match");
        }

    }
}
