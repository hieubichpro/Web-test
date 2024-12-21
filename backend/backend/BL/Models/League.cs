namespace backend.BL.Models
{
    public class League
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int IdUser { get; set; }
    }
    public class LeagueView
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Name_User { get; set; }
    }
}
