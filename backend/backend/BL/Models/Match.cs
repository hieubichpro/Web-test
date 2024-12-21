namespace backend.BL.Models
{
    public class Match
    {
        public int Id { get; set; }
        public int IdHome { get; set; }
        public int IdGuest { get; set; }
        public int IdLeague { get; set; }
        public int GoalHome { get; set; }
        public int GoalGuest { get; set; }
    }

    public class MatchView
    {
        public int Id { get; set; }
        public string NameHome { get; set; }
        public int GoalHome { get; set; }
        public int GoalGuest { get; set; }
        public string NameGuest { get; set; }
    }
}
