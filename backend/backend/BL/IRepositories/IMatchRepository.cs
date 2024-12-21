using backend.BL.Models;

namespace backend.BL.IRepositories
{
    public interface IMatchRepository
    {
        void create(Match match);
        void update(Match match);
        List<Match> readByIdLeague(int id_league);
        Match readByID(int id);
        List<Match> readAll();
        void delete(int id);
    }
}
