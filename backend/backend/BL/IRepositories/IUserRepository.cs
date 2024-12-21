using backend.BL.Models;

namespace backend.BL.IRepositories
{
    public interface IUserRepository
    {
        User readById(int id);
        User readByLogin(string login);
        List<User> readAll();
        void create(User user);
        void update(User user);
        void delete(int id);

    }
}
