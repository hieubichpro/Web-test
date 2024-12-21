using backend.BL.Exceptions;
using backend.BL.IRepositories;
using backend.BL.Models;
using Microsoft.Extensions.Logging;
using System.Data;
using System.Xml.Linq;

namespace backend.BL.Services
{
    public class UserService
    {
        private IUserRepository _userRepository;
        private ILeagueRepository _leagueRepository;
        private ILogger<UserService> logger;
        public UserService(IUserRepository userRepository, ILeagueRepository leagueRepository, ILogger<UserService> logger)
        {
            _userRepository = userRepository;
            _leagueRepository = leagueRepository;
            this.logger = logger;
        }
        public User SignIn(User u)
        {
            logger.LogInformation("login started");
            User user = _userRepository.readByLogin(u.Login);
            if (!user.checkPassword(u.Password))
            {
                logger.LogError("password not correct");
                throw new UserNotMatchPasswordException();
            }
            logger.LogInformation("login success");
            return user;
        }
        public void SignUp(User user)
        {
            logger.LogInformation("register started");
            _userRepository.create(user);
            logger.LogInformation("register success");
        }
        public void DeleteUser(int id)
        {
            logger.LogInformation("delete started");
            _userRepository.delete(id);
            logger.LogInformation("delete ended");
        }
        public List<User> GetAll()
        {
            logger.LogInformation("read all users started");
            return _userRepository.readAll();
        }
        public User GetById(int id)
        {
            logger.LogInformation("started read user by id");
            return _userRepository.readById(id);
        }
        public void UpdateUser(User user)
        {
            logger.LogInformation("update user started");
            _userRepository.update(user);
            logger.LogInformation("update user ended");
        }
        public void ChangePassword(int id, User u)
        {
            logger.LogInformation("change password started");
            var user = _userRepository.readById(id);
            if (user == null)
            {
                logger.LogInformation("user not found");
                throw new UserNotFoundException();
            }
            user.Password = u.Password;
            _userRepository.update(user);
            logger.LogInformation("change password ended");
        }

        public List<LeagueView> GetLeagues(int userId)
        {
            var tmp = _leagueRepository.readByIdUser(userId);
            List<LeagueView> res = new List<LeagueView>();
            foreach (var league in tmp)
            {
                var user = _userRepository.readById(userId);
                res.Add(new LeagueView { Id = league.Id, Name = league.Name, Name_User = user.Name });
            }
            return res;
        }

        //public List<User> GetByRole(string role)
        //{
        //    return _userRepository.rea
        //}
    }
}
