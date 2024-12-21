using AutoMapper;
using backend.BL.Exceptions;
using backend.BL.IRepositories;
using backend.BL.Models;
using backend.DA.dbContext;
using backend.DA.Entities;

namespace backend.DA.Repositories
{
    public class UserRepository : IUserRepository
    {
        private dbContextFactory _dbContextFactory;
        private IMapper _mapper;
        private ILogger<UserRepository> logger;
        public UserRepository(dbContextFactory dbContextFactory, IMapper mapper, ILogger<UserRepository> logger)
        {
            _dbContextFactory = dbContextFactory;
            _mapper = mapper;
            this.logger = logger;
        }
        public User readById(int id)
        {
            logger.LogInformation("started read user by id");
            using var db_context = _dbContextFactory.get_db_context();
            var user = db_context.users.FirstOrDefault(u => u.Id == id);
            if (user == null)
            {
                logger.LogError($"user with id = {id} not exists");
                throw new UserNotFoundException();
            }
            logger.LogInformation("ended read user by id");
            return _mapper.Map<UserDb, User>(user);
        }
        public User readByLogin(string login)
        {
            logger.LogInformation("started read user by login");
            using var db_context = _dbContextFactory.get_db_context();
            var user = db_context.users.FirstOrDefault(u => u.Login == login);
            if (user == null)
            {
                logger.LogError($"user with login = {login} not exists");
                throw new UserNotFoundException();
            }
            logger.LogInformation("ended read user by login");
            return _mapper.Map<UserDb, User>(user);
        }
        public List<User> readAll()
        {
            logger.LogInformation("started read all users");
            using var db_context = _dbContextFactory.get_db_context();
            var users = db_context.users.ToList();
            logger.LogInformation("ended read user by role");
            return users.Select(u => _mapper.Map<UserDb, User>(u)).ToList();
        }
        public void create(User u)
        {
            var user = _mapper.Map<User, UserDb>(u);
            logger.LogInformation("started create user");
            using var db_context = _dbContextFactory.get_db_context();
            if (db_context.users.FirstOrDefault(u => u.Login == user.Login) != null)
            {
                logger.LogError("user have been exists");
                throw new UserExistException();
            }
            if (db_context.users.Count() > 0)
            {
                user.Id = db_context.users.Select(u => u.Id).Max() + 1;
            }
            else
            {
                user.Id = 1;
            }
            db_context.users.Add(user);
            db_context.SaveChanges();
            logger.LogInformation("ended create user");
        }
        public void update(User u)
        {
            logger.LogInformation("started update user");
            using var db_context = _dbContextFactory.get_db_context();
            var user = db_context.users.FirstOrDefault(user => user.Login == u.Login);
            if (user == null)
            {
                logger.LogError("user doesnt exists");
                throw new UserNotFoundException();
            }
            user.Login = u.Login;
            user.Password = u.Password;
            user.Name = u.Name;
            user.Role = u.Role;
            db_context.SaveChanges();
            logger.LogInformation("ended update user");
        }

        public void delete(int id)
        {
            logger.LogInformation("started delete user");
            using var db_context = _dbContextFactory.get_db_context();
            var user = db_context.users.FirstOrDefault(u => u.Id == id);
            if (user == null)
            {
                logger.LogError("user doesnt exists");
                throw new UserNotFoundException();
            }
            db_context.users.Remove(user);
            db_context.SaveChanges();
            logger.LogInformation("ended delete user");
        }
    }
}
