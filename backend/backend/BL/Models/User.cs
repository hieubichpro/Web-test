namespace backend.BL.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Login { get; set; }
        public string Password { get; set; }
        public string Role { get; set; }
        public string Name { get; set; }
        public bool checkPassword(string password)
        {
            return this.Password.Equals(password);
        }
    }
}
