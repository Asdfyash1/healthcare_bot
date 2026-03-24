from django.db import models


class QnA(models.Model):
    """
    Stores question-answer pairs for the healthcare chatbot.
    The 'label' corresponds to the predicted class from the CNN model.
    """
    label = models.CharField(max_length=100, unique=True)
    answer = models.TextField()
    keywords = models.TextField(blank=True, help_text="Comma-separated keywords for this label")

    class Meta:
        verbose_name = "Q&A"
        verbose_name_plural = "Q&As"
        ordering = ['label']

    def __str__(self):
        return self.label
