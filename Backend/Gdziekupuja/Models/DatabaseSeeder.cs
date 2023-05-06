namespace Gdziekupuja.Models;

public class DatabaseSeeder
{
    private readonly GdziekupujaContext _dbContext;

    public DatabaseSeeder(GdziekupujaContext dbContext)
    {
        _dbContext = dbContext;
    }

    public void Seed()
    {
        if (_dbContext.Database.CanConnect())
        {
            if (!_dbContext.Counties.Any())
            {
                var counties = GetCounties();
                _dbContext.Counties.AddRange(counties);
                _dbContext.SaveChanges();
            }
        }
    }

    private IEnumerable<County> GetCounties()
    {
        var counties = new List<County>();

        using (var sr = new StreamReader(Path.GetFullPath("Models\\Counties.csv")))
        {
            while (!sr.EndOfStream)
            {
                var line = sr.ReadLine();
                var values = line.Split(';');

                counties.Add(new County
                {
                    Name = values[1]
                });
            }
        }

        return counties;
    }
}