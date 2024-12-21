namespace backend.DA.dbContext
{
    public interface dbContextFactory
    {
        AppDbContext get_db_context();
    }
}
