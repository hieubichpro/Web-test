namespace backend.BL.Exceptions
{
    public class UserNotFoundException : Exception
    {
        public UserNotFoundException(string inf = "Не существует такого пользователя") : base(inf) { }
        public UserNotFoundException(Exception inner, string inf = "Не существует такого пользователя") : base(inf, inner) { }
    }
    public class UserNotMatchPasswordException : Exception
    {
        public UserNotMatchPasswordException(string inf = "неверный пароль") : base(inf) { }
    }

    public class UserExistException : Exception
    {
        public UserExistException(string inf = "уже сущ") : base(inf) { }
    }
    public class MatchNotFoundException : Exception
    {
        public MatchNotFoundException(string inf = "Не существует такого матча") : base(inf) { }
    }
    public class MatchExistsException : Exception
    {
        public MatchExistsException(string inf = "уже сущ") : base(inf) { }
    }
    public class LeagueExistException : Exception
    {
        public LeagueExistException(string inf = "Уже существует") : base(inf) { }
    }
    public class LeagueNotFoundException : Exception
    {
        public LeagueNotFoundException(string inf = "Не существует такой лиги") : base(inf) { }
    }
    public class ClubExistException : Exception
    {
        public ClubExistException(string inf = "Уже существует") : base(inf) { }
    }
    public class ClubNotFoundException : Exception
    {
        public ClubNotFoundException(string inf = "Не существует такого клуба") : base(inf) { }
    }

}
