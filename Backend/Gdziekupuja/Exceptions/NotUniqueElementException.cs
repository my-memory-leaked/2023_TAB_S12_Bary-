namespace Gdziekupuja.Exceptions;

public class NotUniqueElementException : Exception
{
    public NotUniqueElementException()
    {
    }

    public NotUniqueElementException(string msg) : base(msg)
    {
    }
}