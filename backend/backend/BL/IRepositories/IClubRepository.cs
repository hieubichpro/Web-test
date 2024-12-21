using backend.BL.Models;

namespace backend.BL.IRepositories
{
    public interface IClubRepository
    {
        Club readbyName(string name);
        Club readbyId(int id);
        void create(Club club);
        List<Club> readAll();
        void update(Club club);
        void delete(int id);
        List<Club> readByIdLeague(int idleague);
        List<Club> readClubBy(string start_with);
    }
}
