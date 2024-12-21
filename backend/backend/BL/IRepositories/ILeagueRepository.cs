using backend.BL.Models;
using backend.DA.Entities;

namespace backend.BL.IRepositories
{
    public interface ILeagueRepository
    {
        League readbyName(string name);
        void create(League league);
        void delete(int id);
        League readById(int id);
        List<League> readAll();
        List<League> readByIdUser(int id);
        void update(League league);

    }
}
