using backend.BL.Exceptions;
using backend.BL.IRepositories;
using backend.BL.Models;
using Microsoft.Extensions.Logging;
using System.Xml.Linq;

namespace backend.BL.Services
{
    public class ClubService
    {
        private IClubRepository _clubRepository;
        private ILogger<ClubService> _logger;
        public ClubService(IClubRepository clubRepository, ILogger<ClubService> logger)
        {
            _clubRepository = clubRepository;
            _logger = logger;
        }
        public void InsertClub(Club club)
        {
            _logger.LogInformation("start insert club");
            _clubRepository.create(club);
            _logger.LogInformation("end insert club");
        }
        public string GetName(int id)
        {
            _logger.LogInformation("start read name by id");
            var club = _clubRepository.readbyId(id);
            _logger.LogInformation("end read name by id");
            return club.Name;
        }
        public List<Club> GetAll()
        {
            _logger.LogInformation("started read all clubs");
            return _clubRepository.readAll();
        }
        public void ModifyClub(int id, Club club)
        {
            _logger.LogInformation("start modify club");
            club.Id = id;
            _clubRepository.update(club);
            _logger.LogInformation("end modify club");
        }
        public void DeleteClub(int id)
        {
            _logger.LogInformation("start delete club");
            _clubRepository.delete(id);
            _logger.LogInformation("end delete club");
        }
        public Club GetById(int id)
        {
            _logger.LogInformation("start read club by id");
            return _clubRepository.readbyId(id);
        }

        public List<Club> GetClub(string start_with)
        {
            return _clubRepository.readClubBy(start_with);
        }
    }
}
