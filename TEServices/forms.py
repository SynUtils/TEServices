# -*- coding: utf-8 -*-
from django import forms
from django.db import models


class DocumentForm(forms.Form):

    docfile = forms.FileField(
         label='', show_hidden_initial='none',required=True,

)


